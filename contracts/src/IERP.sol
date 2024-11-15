// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IERP {
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
        address[] memory beforeHooks,
        address[] memory afterHooks
    ) external returns (uint256 programId);

    function setReferral(uint256 programId, address referral) external;
}
