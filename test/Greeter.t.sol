// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Greeter.sol";

contract GreeterTest is Test {
    string greeting;
    Greeter greeter;

    function setUp() public {
        greeting = "Hello, forge!";
        greeter = new Greeter();
        greeter.setGreeting(greeting);
    }

    function testGreeting() public {
        assertEq(greeting, "Hello, forge!");
    }

    function testFailGreeting() public {
        assertEq(greeting, "Hello, world!");
    }
}
