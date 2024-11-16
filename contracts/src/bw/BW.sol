// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IRouterClient} from "@chainlink-ccip/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink-ccip/contracts/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink-ccip/contracts/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink-ccip/contracts/src/v0.8/ccip/applications/CCIPReceiver.sol";

import {IEntropyConsumer} from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import {IEntropy} from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

import {IBW} from "./IBW.sol";

contract BW is CCIPReceiver, IEntropyConsumer, IBW, Ownable {
    address public ccipErpHook; 

    address public immutable entropy;

    mapping(address => Bubble) private _bubbles;

    mapping(uint64 => Raid) private _raids;

    uint256 public constant ACCOUNT_POINTS = 1;
    uint256 public constant REFERRAL_POINTS = 2;

    uint256 public constant RAID_COOLDOWN = 0 seconds;

    uint256 public constant RAID_MULTIPLIER_MIN = 50;
    uint256 public constant RAID_MULTIPLIER_MAX = 150;

    constructor(
        address ccipHook,
        address ccipRouter,
        address pythEntropy,
        address owner
    ) CCIPReceiver(ccipRouter) Ownable(owner) {
        ccipErpHook = ccipHook;
        entropy = pythEntropy;
    }

    function getBubble(
        address bubble
    ) external view override returns (uint256, uint256) {
        return (_getPoints(bubble), _bubbles[bubble].lastRaid);
    }

    function getRaid(
        uint64 raidId
    ) external view override returns (address, address, bool) {
        return (
            _raids[raidId].raider,
            _raids[raidId].defender,
            _raids[raidId].ended
        );
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        if(abi.decode(any2EvmMessage.sender, (address)) != ccipErpHook) {
            revert();
        }

        (address account, address referral) = abi.decode(
            any2EvmMessage.data,
            (address, address)
        );

        _bubbles[account].points += ACCOUNT_POINTS;
        _bubbles[referral].points += REFERRAL_POINTS;

        emit NewReferral(account, referral);
    }

    function setCcipErpHook(address hook) external onlyOwner {
        ccipErpHook = hook;
    }

    function setPoints(address bubble, uint256 value) external onlyOwner {
        _bubbles[bubble].points = value;
    }

    function _getPoints(address bubble) internal view returns (uint256) {
        return _bubbles[bubble].points + 1;
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

        _raids[raidId] = Raid(msg.sender, bubble, false);

        emit RaidStarted(raidId, msg.sender, bubble);
    }

    function entropyCallback(
        uint64 sequenceNumber /* Raid ID */,
        address /* provider */,
        bytes32 randomNumber
    ) internal override {
        if (_raids[sequenceNumber].ended) {
            revert();
        }

        _raids[sequenceNumber].ended = true;

        uint256 range = (RAID_MULTIPLIER_MAX - RAID_MULTIPLIER_MIN) + 1;
        uint256 multiplier = RAID_MULTIPLIER_MIN +
            (uint256(randomNumber) % range);

        uint256 raiderPoints = (_getPoints(_raids[sequenceNumber].raider) /
            100) * multiplier;
        uint256 defenderPoints = _getPoints(_raids[sequenceNumber].defender);

        if (raiderPoints > defenderPoints) {
            uint256 amount = raiderPoints - defenderPoints;
            if (_bubbles[_raids[sequenceNumber].defender].points <= amount) {
                _bubbles[_raids[sequenceNumber].defender].points = 0;
            } else {
                _bubbles[_raids[sequenceNumber].defender].points -= amount;
            }
            _bubbles[_raids[sequenceNumber].raider].points += amount;

            emit RaidEnded(
                sequenceNumber,
                _raids[sequenceNumber].defender,
                amount
            );
        }

        if (defenderPoints > raiderPoints) {
            uint256 amount = defenderPoints - raiderPoints;
            if (_bubbles[_raids[sequenceNumber].raider].points <= amount) {
                _bubbles[_raids[sequenceNumber].raider].points = 0;
            } else {
                _bubbles[_raids[sequenceNumber].raider].points -= amount;
            }
            _bubbles[_raids[sequenceNumber].defender].points += amount;

            emit RaidEnded(
                sequenceNumber,
                _raids[sequenceNumber].raider,
                amount
            );
        }
    }

    function getEntropy() internal view override returns (address) {
        return entropy;
    }
}
