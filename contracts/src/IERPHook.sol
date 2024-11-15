// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IERPHook {
    function beforeReferral() external;
    function afterReferral() external;
}
