import {createContext, useState, useEffect, ReactNode, FC} from 'react';
import { User } from '../types';

interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const [user, setUserState] = useState<User | null>(null);

	const setUser = (newUser: User | null) => {
		setUserState(newUser);
		if (newUser) {
			localStorage.setItem('user', JSON.stringify(newUser));
		} else {
			localStorage.removeItem('user');
		}
	};

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUserState(JSON.parse(storedUser));
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;