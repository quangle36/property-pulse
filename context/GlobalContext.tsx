'use client';

import {
	createContext,
	useContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from 'react';
export interface GlobalContextType {
	unreadCount: number;
	setUnreadCount: Dispatch<SetStateAction<number>>;
}
//Create context
const GlobalContext = createContext<GlobalContextType | null>(null);

//Create a provider
export function GlobalProvider({ children }: { children: React.ReactNode }) {
	const [unreadCount, setUnreadCount] = useState(0);
	return (
		<GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
			{children}
		</GlobalContext.Provider>
	);
}

//Create a custom hook to access context
export function useGlobalContext() {
	return useContext(GlobalContext);
}
