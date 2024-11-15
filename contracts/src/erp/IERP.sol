// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IERP {
    error ERPReferralIsZeroAddress();
    error ERPReferralIsSender();

    event NewReferralProgram(address indexed to, uint256 indexed programId);
    event SetReferral(
        uint256 indexed programId,
        address indexed account,
        address indexed referral
    );

    struct ReferralProgram {
        mapping(address => uint256) totalReferrals;
        mapping(address => address) referrals;
        address[] hooks;
    }

    function getTotalReferrals(
        uint256 programId,
        address account
    ) external view returns (uint256);

    function getReferral(
        uint256 programId,
        address account
    ) external view returns (address);

    function newReferralProgram(
        address to,
        address[] memory hooks
    ) external returns (uint256 programId);

    function setReferral(uint256 programId, address referral) external;
}
