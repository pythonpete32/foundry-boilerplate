// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Greeter {
    string public greeting;

    event Greet(address from, string indexed message);

    constructor() {
        greeting = "Hello, world!";
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
        emit Greet(msg.sender, greeting);
    }
}
