// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {IERP} from "./IERP.sol";
import {IERPHook} from "./IERPHook.sol";

// Ethereum Referral Protocol - By Quinn, Jack and John

contract ERP is IERP, ERC721 {
    struct ReferralProgram {
        mapping(address => uint256) totalReferrals;
        mapping(address => address) referrals;
        address[] beforeHooks;
        address[] afterHooks;
    }

    uint256 private _totalSupply;

    // Program ID => Referral program
    mapping(uint256 => ReferralProgram) private _programs;

    constructor() ERC721("Ethereum Referral Protocol", "ERP") {}

    /*
        
    */
    function getTotalReferrals(
        uint256 programId,
        address account
    ) external view override returns (uint256) {
        return _programs[programId].totalReferrals[account];
    }

    function getReferral(
        uint256 programId,
        address account
    ) external view override returns (address) {
        return _programs[programId].referrals[account];
    }

    function newReferralProgram(
        address to,
        address[] memory beforeHooks,
        address[] memory afterHooks
    ) external override returns (uint256 programId) {
        programId = _totalSupply;
        _totalSupply++;

        _programs[programId].beforeHooks = beforeHooks;
        _programs[programId].afterHooks = afterHooks;

        _safeMint(to, programId);
    }

    function setReferral(
        uint256 programId,
        address referral
    ) external override {
        if (_programs[programId].referrals[msg.sender] != address(0)) {
            revert();
        }

        if (msg.sender == referral) {
            revert();
        }

        _beforeReferral(programId);

        _programs[programId].totalReferrals[referral]++;
        _programs[programId].referrals[msg.sender] = referral;

        _afterReferral(programId);
    }

    function _beforeReferral(uint256 programId) private {
        for (uint256 i = 0; i < _programs[programId].beforeHooks.length; i++) {
            IERPHook(_programs[programId].beforeHooks[i]).beforeReferral();
        }
    }

    function _afterReferral(uint256 programId) private {
        for (uint256 i = 0; i < _programs[programId].afterHooks.length; i++) {
            IERPHook(_programs[programId].afterHooks[i]).afterReferral();
        }
    }
}
