// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract IODomains {
		mapping(string => address) public domains;
        mapping(string => string) public records;

    constructor() {
        console.log("This is the IO domain naming service, which allows you to register a human readable name ending in .io that links to your Polygon address.");
    }
	
    function register(string calldata name) public {
        require(domains[name] == address(0));
        domains[name] = msg.sender;
        console.log("%s has registered the custom IOdomain %s", msg.sender,name);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        require(domains[name] == msg.sender);
        records[name] = record;
        console.log("You have set a new record stating: ",record);
    }

    function getRecord(string calldata name) public view returns (string memory) {
        return records[name];
    }
}