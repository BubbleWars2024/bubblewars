import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  NewReferralProgram as NewReferralProgramEvent,
  SetReferral as SetReferralEvent,
  Transfer as TransferEvent
} from "../generated/ERP/ERP"
import {
  Approval,
  ApprovalForAll,
  NewReferralProgram,
  SetReferral,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewReferralProgram(event: NewReferralProgramEvent): void {
  let entity = new NewReferralProgram(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.programId = event.params.programId
  entity.hooks = event.params.hooks

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetReferral(event: SetReferralEvent): void {
  let entity = new SetReferral(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.programId = event.params.programId
  entity.account = event.params.account
  entity.referral = event.params.referral

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
