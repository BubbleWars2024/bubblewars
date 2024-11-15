// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IERPHook {
    function beforeReferral(uint256 programId, address account, address referral) external;
    function afterReferral(uint256 programId, address account, address referral) external;
}