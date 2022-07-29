#!/bin/bash

source .env

# To deploy and verify our contract
forge script script/Greeter.s.sol:GreeterScript \
    --rpc-url $RINKEBY_RPC_URL  \
    --private-key $PRIVATE_KEY  \
    --broadcast \
    --verify \
    --etherscan-api-key $ETHERSCAN_KEY -vvvv

echo Done!