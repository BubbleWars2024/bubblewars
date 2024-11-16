import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NewReferral,
  OwnershipTransferred,
  RaidEnded,
  RaidStarted
} from "../generated/BubbleWars/BubbleWars"

export function createNewReferralEvent(
  account: Address,
  referral: Address
): NewReferral {
  let newReferralEvent = changetype<NewReferral>(newMockEvent())

  newReferralEvent.parameters = new Array()

  newReferralEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  newReferralEvent.parameters.push(
    new ethereum.EventParam("referral", ethereum.Value.fromAddress(referral))
  )

  return newReferralEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRaidEndedEvent(
  raidId: BigInt,
  loser: Address,
  damage: BigInt
): RaidEnded {
  let raidEndedEvent = changetype<RaidEnded>(newMockEvent())

  raidEndedEvent.parameters = new Array()

  raidEndedEvent.parameters.push(
    new ethereum.EventParam("raidId", ethereum.Value.fromUnsignedBigInt(raidId))
  )
  raidEndedEvent.parameters.push(
    new ethereum.EventParam("loser", ethereum.Value.fromAddress(loser))
  )
  raidEndedEvent.parameters.push(
    new ethereum.EventParam("damage", ethereum.Value.fromUnsignedBigInt(damage))
  )

  return raidEndedEvent
}

export function createRaidStartedEvent(
  raidId: BigInt,
  raider: Address,
  defender: Address
): RaidStarted {
  let raidStartedEvent = changetype<RaidStarted>(newMockEvent())

  raidStartedEvent.parameters = new Array()

  raidStartedEvent.parameters.push(
    new ethereum.EventParam("raidId", ethereum.Value.fromUnsignedBigInt(raidId))
  )
  raidStartedEvent.parameters.push(
    new ethereum.EventParam("raider", ethereum.Value.fromAddress(raider))
  )
  raidStartedEvent.parameters.push(
    new ethereum.EventParam("defender", ethereum.Value.fromAddress(defender))
  )

  return raidStartedEvent
}
