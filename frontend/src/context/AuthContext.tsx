'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { useRouter } from 'next/navigation';

const keycloak = new Keycloak({
    url: 'http://localhost:8081',
    realm: 'TechStr',
    clientId: 'myclient'
});

interface AuthContextType {
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: () => void;
    logout: () => void;
    token: string | undefined;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isAdmin: false,
    login: () => {},
    logout: () => {},
    token: undefined,
    loading: true
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        keycloak.init({ onLoad: 'check-sso' })
            .then(authenticated => {
                setIsAuthenticated(authenticated);
                if (authenticated) {
                    setToken(keycloak.token || '');
                    setIsAdmin(keycloak.hasRealmRole('admin'));
                } else {
                    router.push('/welcome');
                }
            })
            .catch(error => {
                console.error('Keycloak init error:', error);
                router.push('/welcome');
            });
    }, [router]);

    const login = () => {
        keycloak.login({
            redirectUri: window.location.origin + '/inventory'
        });
    };

    const logout = () => {
        keycloak.logout({
            redirectUri: window.location.origin + '/welcome'
        });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, token, loading: false }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); 