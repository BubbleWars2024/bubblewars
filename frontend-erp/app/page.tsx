"use client";

import ProgramForm from "@/components/program-form"
import { Button } from "@/components/ui/button"
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";

export default function Page() {
    const { login, logout } = usePrivy();

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <header className="flex items-center justify-between p-4 md:px-6">
                <div className="flex items-center space-x-2">
                    <svg
                        className="h-8 w-8 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M12 2L2 12l10 10 10-10L12 2z" />
                    </svg>
                    <span className="text-2xl font-bold">ERP</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button className="bg-blue-500 hover:bg-blue-600" onClick={async () => {
                        await logout();
                        login();
                    }}>
                        Connect
                    </Button>
                </div>
            </header>
            <main className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight text-blue-500 sm:text-5xl">
                        Your web3 referrals
                    </h1>
                    <ProgramForm
                        className="max-w-[32rem] mx-auto"
                    />
                </div>
            </main>
        </div>
    )
}