from langchain_openai import ChatOpenAI
from cdp_langchain.agent_toolkits import CdpToolkit
from cdp_langchain.utils import CdpAgentkitWrapper
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

# Initialize the LLM with OpenAI
llm = ChatOpenAI(model="gpt-4o-mini")

# Initialize CDP AgentKit wrapper
cdp = CdpAgentkitWrapper()
cdp_toolkit = CdpToolkit.from_cdp_agentkit_wrapper(cdp)
tools = cdp_toolkit.get_tools()

# Create the agent
agent_executor = create_react_agent(
    llm,
    tools=tools,
    state_modifier="You are a tactical game AI. Decide whether to attack a player based on their positions and sizes relative to yours. If you decide to attack, return the target player's address."
)


def post_on_chain(player_address: str):
    """
    Use CDP AgentKit to post the AI's decision on-chain.
    """
    try:
        cdp_toolkit.execute_transaction(
            contract_address="0xYourSmartContractAddress",
            method_name="attackPlayer",
            parameters=[player_address]
        )
        print(f"Posted decision on-chain: Attack player {player_address}")
    except Exception as e:
        print(f"Error posting on-chain: {e}")


def ask_agent(game_context: dict):
    """
    Analyze the game context and decide whether to attack a player.
    """
    # Convert the game context to a string for the AI to process
    context_str = f"Game context: {game_context}"
    decision = ""
    
    # Stream the decision from the LangChain agent
    for chunk in agent_executor.stream(
        {"messages": [HumanMessage(content=f"Analyze and decide: {context_str}")]}
    ):
        if "agent" in chunk:
            decision += chunk["agent"]["messages"][0].content
        elif "tools" in chunk:
            decision += chunk["tools"]["messages"][0].content

    # Parse the AI's decision to extract the target player's address
    if "attack player" in decision:
        player_address = decision.split("attack player ")[-1].strip()
        if player_address:
            # Post the decision on-chain
            post_on_chain(player_address)
            return f"AI decided to attack player {player_address}"
    
    return "AI decided not to attack anyone."