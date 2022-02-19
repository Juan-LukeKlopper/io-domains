// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import { StringUtils } from "./libraries/StringUtils.sol";
import "hardhat/console.sol";

contract DomainNameService {
    string public tld;

		mapping(string => address) public domains;
        mapping(string => string) public records;

    constructor(string memory _tld) payable {
        tld = _tld;
        console.log("This is the %s domain naming service, which allows you to register a human readable name ending in .%s that links to your Polygon address.", _tld, _tld);
    }

    function price(string calldata name) public pure returns (uint) {
        uint len = StringUtils.strlen(name);
        require (len > 0);
        if (len == 3) {
            return 5*10**17;
        } else if (len == 4) {
            return 4*10**17;
        } else {
            return 3*10**17;
        }
    }
	
    function register(string calldata name) public payable{
        require(domains[name] == address(0));
        uint _price = this.price(name);
        require(msg.value >= _price, "Not enough MATIC to mint domain.");
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