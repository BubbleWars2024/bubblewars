"use client";

import { z } from "zod";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useState } from "react";
import { Button } from "./ui/button";
import React from "react";
import { useWallets } from "@privy-io/react-auth";
import { encodeFunctionData, getAddress, isAddress } from "viem";

export interface ProgramFormProps extends React.HTMLAttributes<HTMLElement> { }

const formSchema = z.object({
    hooks: z.string().array()
});

export default function ProgramForm({
    ...props
}: ProgramFormProps) {
    const [hookField, setHookField] = useState<string>("");

    const { wallets } = useWallets();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hooks: [],
        },
        mode: "all"
    });
    form.watch();

    const handleAddHook = () => {
        if (!isAddress(hookField)) {
            form.setError("hooks", { message: "Invalid address!" });
            return;
        }

        form.setValue("hooks", [hookField, ...form.getValues("hooks")]);
        setHookField("");
        form.clearErrors();
    };

    const handleRemoveHook = (index: number) => {
        const hooks = form.getValues("hooks");
        hooks.splice(index, 1);

        form.setValue("hooks", hooks);
        form.clearErrors();
    };

    const handleSubmit = async () => {
        const wallet = wallets[0];
        console.log(wallet)
        const provider = await wallet.getEthereumProvider();

        const data = encodeFunctionData({
            abi: [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "name": "ERC721IncorrectOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ERC721InsufficientApproval", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "approver", "type": "address" }], "name": "ERC721InvalidApprover", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }], "name": "ERC721InvalidOperator", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "ERC721InvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }], "name": "ERC721InvalidReceiver", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }], "name": "ERC721InvalidSender", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ERC721NonexistentToken", "type": "error" }, { "inputs": [], "name": "ERPReferralIsSender", "type": "error" }, { "inputs": [], "name": "ERPReferralIsZeroAddress", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "programId", "type": "uint256" }, { "indexed": false, "internalType": "address[]", "name": "hooks", "type": "address[]" }], "name": "NewReferralProgram", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "programId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "referral", "type": "address" }], "name": "SetReferral", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "programId", "type": "uint256" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "getReferral", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "programId", "type": "uint256" }], "name": "getReferralProgram", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "programId", "type": "uint256" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "getTotalReferrals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address[]", "name": "hooks", "type": "address[]" }], "name": "newReferralProgram", "outputs": [{ "internalType": "uint256", "name": "programId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "programId", "type": "uint256" }, { "internalType": "address", "name": "referral", "type": "address" }], "name": "setReferral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
            functionName: "newReferralProgram",
            args: [
                getAddress(wallet.address),
                form.getValues("hooks").map((address) => getAddress(address))
            ]
        });

        const transactionRequest = {
            from: wallet.address,
            to: '0xD0B8D0425b737A920Db0B7581Cd2c45CB8caF0fa',
            data: data,
            value: 0
        };

        await provider.request({
            method: 'eth_sendTransaction',
            params: [transactionRequest],
        });
    };

    return (
        <div
            {...props}
        >
            <Form
                {...form}
            >
                <form>
                    <FormField
                        control={form.control}
                        name="hooks"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <div>
                                        <div
                                            className="flex space-x-2"
                                        >
                                            <Input
                                                placeholder="Hook address"
                                                value={hookField}
                                                onChange={(e) => setHookField(e.target.value)}
                                            />
                                            <Button
                                                type="button"
                                                className="bg-blue-500 hover:bg-blue-600"
                                                onClick={handleAddHook}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                        <div
                                            className="mt-4 space-y-2"
                                        >
                                            {form.getValues("hooks").map((address, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-gray-100 p-2 rounded"
                                                >
                                                    <span>{address}</span>
                                                    <Button
                                                        type="button"
                                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                                                        onClick={() => handleRemoveHook(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div
                        className="mt-8"
                    >
                        <Button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-xl"
                            onClick={handleSubmit}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}