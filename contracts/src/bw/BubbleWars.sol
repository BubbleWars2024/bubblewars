// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IEntropyConsumer} from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import {IEntropy} from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

import {IERPHook} from "../erp/IERPHook.sol";
import {IERP} from "../erp/IERP.sol";

import {IBubbleWars} from "./IBubbleWars.sol";

contract BubbleWars is IEntropyConsumer, IERPHook, IBubbleWars {
    address public immutable erp;
    uint256 public immutable erpProgramId;

    address public immutable entropy;

    mapping(address => Bubble) private _bubbles;

    mapping(uint64 => Raid) private _raids;

    uint256 public constant ACCOUNT_POINTS = 1;
    uint256 public constant REFERRAL_POINTS = 2;

    uint256 public constant RAID_COOLDOWN = 2 minutes;

    constructor(address ethReferralProtocol, address pythEntropy) {
        erp = ethReferralProtocol;

        address[] memory hooks = new address[](1);
        hooks[0] = address(this);
        erpProgramId = IERP(ethReferralProtocol).newReferralProgram(
            address(this),
            hooks
        );

        entropy = pythEntropy;
    }

    function beforeReferral(
        uint256 programId,
        address account,
        address referral
    ) external {}

    function afterReferral(
        uint256 programId,
        address account,
        address referral
    ) external {
        if (msg.sender != erp) {
            revert();
        }

        if (programId != erpProgramId) {
            revert();
        }

        _bubbles[account].points += ACCOUNT_POINTS;
        _bubbles[referral].points += REFERRAL_POINTS;
    }

    function raid(
        address bubble,
        bytes32 randomness
    ) external payable returns (uint64 raidId) {
        if (_bubbles[msg.sender].lastRaid + RAID_COOLDOWN > block.timestamp) {
            revert();
        }

        _bubbles[msg.sender].lastRaid = block.timestamp;

        address entropyProvider = IEntropy(entropy).getDefaultProvider();
        uint256 fee = IEntropy(entropy).getFee(entropyProvider);

        raidId = IEntropy(entropy).requestWithCallback{value: fee}(
            entropyProvider,
            randomness
        );

        _raids[raidId] = Raid(msg.sender, bubble);
    }

    function entropyCallback(
        uint64 sequenceNumber /* Raid ID */,
        address provider,
        bytes32 randomNumber
    ) internal override {
        // Raid logic
    }

    function getEntropy() internal view override returns (address) {
        return entropy;
    }
}
