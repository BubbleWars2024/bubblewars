import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
    NewReferralProgram as NewReferralProgramEvent,
    SetReferral as SetReferralEvent,
} from "../generated/ERP/ERP";
import {
    ReferralProgram,
    ReferralTotal,
    Referral
} from "../generated/schema";

export function handleNewReferralProgram(event: NewReferralProgramEvent): void {
    let referralProgram = new ReferralProgram(referralProgramId(event.params.programId));

    referralProgram.deployer = event.transaction.from;
    referralProgram.hooks = changetype<Bytes[]>(event.params.hooks);

    referralProgram.save();
}

export function handleSetReferral(event: SetReferralEvent): void {
    let referral = new Referral(referralId(event.transaction.hash, event.logIndex));

    referral.account = event.params.account;
    referral.referral = event.params.referral;
    referral.referralProgram = referralProgramId(event.params.programId);
    
    let referralTotal = ReferralTotal.load(referralTotalId(event.params.referral, event.params.programId));
    if(!referralTotal) {
        referralTotal = new ReferralTotal(referralTotalId(event.params.referral, event.params.programId));
    
        referralTotal.address = event.params.referral;
        referralTotal.total = BigInt.zero();
        referralTotal.referralProgram = referralProgramId(event.params.programId);
    }
    referralTotal.total = referralTotal.total.plus(BigInt.fromI32(1));

    referral.save();
    referralTotal.save();
}

function referralProgramId(programId: BigInt): Bytes {
    return Bytes.fromHexString(uint256ToHex(programId));
}

function referralTotalId(referral: Address, programId: BigInt): Bytes {
    return referral.concat(Bytes.fromHexString(uint256ToHex(programId)));
}

function referralId(transactionHash: Bytes, logIndex: BigInt): Bytes {
    return transactionHash.concatI32(logIndex.toI32());
}

function uint256ToHex(value: BigInt): string {
    return `0x${value.toHex().replace("0x", "").padStart(64, "0")}`;
}