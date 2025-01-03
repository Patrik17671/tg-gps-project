import { useContext, useState, useEffect, useCallback, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, Button, Box, Alert } from '@mui/material';
import { UserContext } from './UserContext';
import { getCoordinates } from '../api';
import UserDetailForm from './UserDetailForm';

const UserDetail: FC = () => {
	const { user, setUser } = useContext(UserContext)!;
	const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const history = useHistory();

	const fetchCoordinates = useCallback(async (address: string) => {
		setLoading(true);
		try {
			const data = await getCoordinates(address);
			if (data && data.lat !== undefined && data.lon !== undefined) {
				setCoordinates({ lat: data.lat, lon: data.lon });
				setLoading(false);
			} else {
				setCoordinates(null);
			}
		} catch (error) {
			console.error('Error fetching coordinates:', error);
			setCoordinates(null);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (user?.address) {
			fetchCoordinates(user.address);
		}
	}, [fetchCoordinates, user?.address]);

	const handleLogout = () => {
		setUser(null);
		history.push('/');
	};

	const handleSave = async (data: { name: string; address: string }) => {
		if (user) {
			const updatedUser = { ...user, name: data.name, address: data.address };
			setUser(updatedUser);
			try {
				await fetchCoordinates(data.address);
				setSuccessMessage('Name and address were successfully updated.');
				setTimeout(() => setSuccessMessage(null), 3000);
			} catch (error) {
				console.error('Error fetching coordinates:', error);
			}
		}
	};

	if (!user) {
		return <Typography>No user logged in</Typography>;
	}

	return (
		<Container>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						{user.name}
					</Typography>
					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>

			<Typography variant="h4" component="h1" gutterBottom>
				User Details
			</Typography>

			<UserDetailForm
				defaultValues={{ name: user.name, address: user.address }}
				onSubmit={handleSave}
			/>

			{successMessage && (
				<Alert severity="success" sx={{ marginBottom: 2, marginTop: 2 }}>
					{successMessage}
				</Alert>
			)}

			{coordinates ? (
				<Box
					sx={{
						backgroundColor: '#e0f7fa',
						borderRadius: 2,
						padding: 2,
						marginTop: 2,
						boxShadow: 3,
					}}
				>
					<Typography variant="h6" component="p" gutterBottom>
						Coordinates
					</Typography>
					<Typography>Latitude: {coordinates.lat}</Typography>
					<Typography>Longitude: {coordinates.lon}</Typography>
				</Box>
			) : (
				<Box
					sx={{
						backgroundColor: '#ffebee',
						borderRadius: 2,
						padding: 2,
						marginTop: 2,
						boxShadow: 3,
					}}
				>
					<Typography color={loading ? "" : "error"} variant="h6" component="p">
						{loading ? "Loading..." : "No coordinates available"}
					</Typography>
				</Box>
			)}
		</Container>
	);
};

export default UserDetail;