// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IBubbleWars {
    struct Bubble {
        uint256 points;
        uint256 lastRaid;
    }

    struct Raid {
        address raider;
        address defender;
    }

    function raid(
        address bubble,
        bytes32 randomness
    ) external payable returns (uint64 raidId);
}
