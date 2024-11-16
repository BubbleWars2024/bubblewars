// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IRouterClient} from "@chainlink-ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink-ccip/contracts/src/v0.8/ccip/libraries/Client.sol";

import {IERP} from "../erp/IERP.sol";
import {IERPHook} from "../erp/IERPHook.sol";

contract BWCcipHook is IERPHook, Ownable {
    address public immutable erp;
    uint256 public immutable erpProgramId;

    address public immutable ccipRouter;

    address public destBw;
    uint64 public destChainSelector;

    constructor(address ethReferralProtocol, address router, address owner) Ownable(owner) {
        erp = ethReferralProtocol;

        address[] memory hooks = new address[](1);
        hooks[0] = address(this);
        erpProgramId = IERP(ethReferralProtocol).newReferralProgram(
            address(this),
            hooks
        );

        ccipRouter = router;
    }

    function setBwDestination(address bw, uint64 chain) external onlyOwner {
        destBw = bw;
        destChainSelector = chain;
    }

    function beforeReferral(uint256 programId, address account, address referral) external {}

    function afterReferral(uint256 programId, address account, address referral) external {
        if (msg.sender != erp) {
            revert();
        }

        if (programId != erpProgramId) {
            revert();
        }
        
        _ccipSend(account, referral);
    }

    function _ccipSend(address account, address referral) internal returns (bytes32 messageId) {
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(destBw),
            data: abi.encode(account, referral),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV2({
                    gasLimit: 500_000,
                    allowOutOfOrderExecution: true
                })
            ),
            feeToken: address(0)
        });

        IRouterClient router = IRouterClient(ccipRouter);

        uint256 fees = router.getFee(destChainSelector, evm2AnyMessage);

        if (fees > address(this).balance) {
            revert("Not enough ETH for CCIP fees!");
        }

        messageId = router.ccipSend{value: fees}(
            destChainSelector,
            evm2AnyMessage
        );
        
        return messageId;
    }
}
