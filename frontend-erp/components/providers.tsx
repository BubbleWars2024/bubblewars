'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId="cm3kpp3hy00gjuif9tsy26u9d"
            config={{
                // Customize Privy's appearance in your app
                appearance: {
                    theme: 'light',
                    accentColor: '#676FFF',
                    logo: 'https://your-logo-url',
                },
                
            }}
        >
            {children}
        </PrivyProvider>
    );
}