import {
  NewReferral as NewReferralEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RaidEnded as RaidEndedEvent,
  RaidStarted as RaidStartedEvent
} from "../generated/BubbleWars/BubbleWars"
import {
  NewReferral,
  OwnershipTransferred,
  RaidEnded,
  RaidStarted
} from "../generated/schema"

export function handleNewReferral(event: NewReferralEvent): void {
  let entity = new NewReferral(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.referral = event.params.referral

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRaidEnded(event: RaidEndedEvent): void {
  let entity = new RaidEnded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.raidId = event.params.raidId
  entity.loser = event.params.loser
  entity.damage = event.params.damage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRaidStarted(event: RaidStartedEvent): void {
  let entity = new RaidStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.raidId = event.params.raidId
  entity.raider = event.params.raider
  entity.defender = event.params.defender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
