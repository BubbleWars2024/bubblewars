import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
    NewReferral as NewReferralEvent,
    RaidEnded as RaidEndedEvent,
    RaidStarted as RaidStartedEvent
} from "../generated/BubbleWars/BubbleWars"
import {
    Bubble,
    Raid
} from "../generated/schema"

export function handleNewReferral(event: NewReferralEvent): void {
    let accountBubble = Bubble.load(event.params.account);
    if(!accountBubble) {
        accountBubble = new Bubble(event.params.account);

        accountBubble.points = BigInt.zero();
        accountBubble.lastRaid = BigInt.zero();
    }
    accountBubble.points = accountBubble.points.plus(BigInt.fromI32(1));

    let referralBubble = Bubble.load(event.params.referral);
    if(!referralBubble) {
        referralBubble = new Bubble(event.params.referral);

        referralBubble.points = BigInt.zero();
        referralBubble.lastRaid = BigInt.zero();
    }
    referralBubble.points = referralBubble.points.plus(BigInt.fromI32(2));

    accountBubble.save();
    referralBubble.save();
}

export function handleRaidStarted(event: RaidStartedEvent): void {
    let raid = new Raid(raidId(event.params.raidId));

    raid.raider = event.params.raider;
    raid.defender = event.params.defender;
    raid.loser = Bytes.empty();
    raid.damage = BigInt.zero();
    raid.ended = false;

    raid.save();
}

export function handleRaidEnded(event: RaidEndedEvent): void {
    let raid = Raid.load(raidId(event.params.raidId));
    if(raid) {
        raid.loser = event.params.loser;
        raid.damage = event.params.damage;

        raid.save();
    }
}

function raidId(id: BigInt): Bytes {
    return Bytes.fromHexString(uint256ToHex(id));
}

function uint256ToHex(value: BigInt): string {
    return `0x${value.toHex().replace("0x", "").padStart(64, "0")}`;
}