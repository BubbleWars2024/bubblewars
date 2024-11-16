#!/bin/bash

# Load environment variables
source .env

# Check if required variables are set
if [ -z "$ETHERSCAN_API_KEY" ] || [ -z "$RPC_URL" ] || [ -z "$PRIVATE_KEY" ] || [ -z "$REGISTRY_ADDRESS" ] || [ -z "$INITIAL_OWNER" ]; then
    echo "Error: Missing required environment variables. Please check your .env file."
    exit 1
fi

# Set contract details
CONTRACT_NAME="L2Registrar"
CONTRACT_FILE="src/L2Registrar.sol"

# Build the project
echo "Building the project..."
forge build

# Deploy the contract
echo "Deploying $CONTRACT_NAME from $CONTRACT_FILE..."
DEPLOYED_OUTPUT=$(ETHERSCAN_API_KEY=$ETHERSCAN_API_KEY forge create --rpc-url $RPC_URL \
             --private-key $PRIVATE_KEY \
	      --verify \
	      --legacy \
             $CONTRACT_FILE:$CONTRACT_NAME \
             --constructor-args $REGISTRY_ADDRESS $INITIAL_OWNER \
             --json)

echo "$DEPLOYED_OUTPUT"