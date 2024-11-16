// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IBubbleWars {
    event NewReferral(address indexed account, address indexed referral);

    event RaidStarted(
        uint64 indexed raidId,
        address indexed raider,
        address indexed defender
    );
    event RaidEnded(
        uint64 indexed raidId,
        address indexed loser,
        uint256 indexed damage
    );

    struct Bubble {
        uint256 points;
        uint256 lastRaid;
    }

    struct Raid {
        address raider;
        address defender;
        bool ended;
    }

    function getBubble(
        address bubble
    ) external view returns (uint256 points, uint256 lastRaid);

    function getRaid(
        uint64 raidId
    ) external view returns (address raider, address defender, bool ended);

    function raid(
        address bubble,
        bytes32 randomness
    ) external payable returns (uint64 raidId);
}