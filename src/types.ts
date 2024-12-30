export interface User {
	name: string;
	login: string;
	password: string;
	address: string;
}

export interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}