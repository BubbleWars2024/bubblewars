import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  NewReferralProgram,
  SetReferral,
  Transfer
} from "../generated/ERP/ERP"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createNewReferralProgramEvent(
  to: Address,
  programId: BigInt,
  hooks: Array<Address>
): NewReferralProgram {
  let newReferralProgramEvent = changetype<NewReferralProgram>(newMockEvent())

  newReferralProgramEvent.parameters = new Array()

  newReferralProgramEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  newReferralProgramEvent.parameters.push(
    new ethereum.EventParam(
      "programId",
      ethereum.Value.fromUnsignedBigInt(programId)
    )
  )
  newReferralProgramEvent.parameters.push(
    new ethereum.EventParam("hooks", ethereum.Value.fromAddressArray(hooks))
  )

  return newReferralProgramEvent
}

export function createSetReferralEvent(
  programId: BigInt,
  account: Address,
  referral: Address
): SetReferral {
  let setReferralEvent = changetype<SetReferral>(newMockEvent())

  setReferralEvent.parameters = new Array()

  setReferralEvent.parameters.push(
    new ethereum.EventParam(
      "programId",
      ethereum.Value.fromUnsignedBigInt(programId)
    )
  )
  setReferralEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  setReferralEvent.parameters.push(
    new ethereum.EventParam("referral", ethereum.Value.fromAddress(referral))
  )

  return setReferralEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
