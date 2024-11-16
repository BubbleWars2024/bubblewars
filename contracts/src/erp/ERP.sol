// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {IERP} from "./IERP.sol";
import {IERPHook} from "./IERPHook.sol";

// Ethereum Referral Protocol - By Quinn, Jack and John

contract ERP is IERP, ERC721 {
    uint256 private _totalPrograms;

    // Program ID => Referral program
    mapping(uint256 => ReferralProgram) private _programs;

    constructor() ERC721("Ethereum Referral Protocol", "ERP") {}

    function getReferralProgram(uint256 programId) external view override returns (address[] memory) {
        return _programs[programId].hooks;
    }

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
        address[] memory hooks
    ) external override returns (uint256 programId) {
        programId = _totalPrograms;
        _totalPrograms++;

        _programs[programId].hooks = hooks;

        _safeMint(to, programId);

        emit NewReferralProgram(to, programId, hooks);
    }

    function setReferral(
        uint256 programId,
        address referral
    ) external override {
        if (_programs[programId].referrals[msg.sender] != address(0)) {
            revert ERPReferralIsZeroAddress();
        }

        if (msg.sender == referral) {
            revert ERPReferralIsSender();
        }

        _beforeReferral(programId, msg.sender, referral);

        _programs[programId].totalReferrals[referral]++;
        _programs[programId].referrals[msg.sender] = referral;

        _afterReferral(programId, msg.sender, referral);

        emit SetReferral(programId, msg.sender, referral);
    }

    function _beforeReferral(
        uint256 programId,
        address account,
        address referral
    ) private {
        for (uint256 i = 0; i < _programs[programId].hooks.length; i++) {
            IERPHook(_programs[programId].hooks[i]).beforeReferral(
                programId,
                account,
                referral
            );
        }
    }

    function _afterReferral(
        uint256 programId,
        address account,
        address referral
    ) private {
        for (uint256 i = 0; i < _programs[programId].hooks.length; i++) {
            IERPHook(_programs[programId].hooks[i]).afterReferral(
                programId,
                account,
                referral
            );
        }
    }
}
