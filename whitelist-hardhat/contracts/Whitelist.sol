// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Whitelist {
    
    // maximum number of addresses whitelisted
    uint8 public maxWhitelistedAddresses;

    uint8 public numAddressesWhitelisted;

    mapping(address => bool) public whitelistedAddresses;

    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public {
        require(!whitelistedAddresses[msg.sender], "Should not be already whitelisted");
        require(numAddressesWhitelisted < maxWhitelistedAddresses, "Maximum whitelisted addresses limit reached");

        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted += 1;


    }


}