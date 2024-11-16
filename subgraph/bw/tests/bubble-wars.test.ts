import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { NewReferral } from "../generated/schema"
import { NewReferral as NewReferralEvent } from "../generated/BubbleWars/BubbleWars"
import { handleNewReferral } from "../src/bubble-wars"
import { createNewReferralEvent } from "./bubble-wars-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let account = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let referral = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newNewReferralEvent = createNewReferralEvent(account, referral)
    handleNewReferral(newNewReferralEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewReferral created and stored", () => {
    assert.entityCount("NewReferral", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewReferral",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "account",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewReferral",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "referral",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
