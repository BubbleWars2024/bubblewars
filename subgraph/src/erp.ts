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
    
        referralTotal.total = BigInt.zero();
        referralTotal.referralProgram = referralProgramId(event.params.programId);
    }
    referralTotal.total = referralTotal.total.plus(BigInt.fromI32(1));

    referral.save();
    referralTotal.save();
}

function referralProgramId(programId: BigInt): Bytes {
    let hex: string = programId.toHex();
    if(hex.length % 2 !== 0) {
        console.log(hex.split("0x")[1]);
        hex = `0x0${hex.split("0x")[1]}`;
    }
    return Bytes.fromHexString(hex);
}

function referralTotalId(referral: Address, programId: BigInt): Bytes {
    return referral.concat(Bytes.fromHexString(programId.toHexString()));
}

function referralId(transactionHash: Bytes, logIndex: BigInt): Bytes {
    return transactionHash.concatI32(logIndex.toI32());
}
