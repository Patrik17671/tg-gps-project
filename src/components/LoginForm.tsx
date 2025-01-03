import { useState, useContext, FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { UserContext } from './UserContext';
import { User } from '../types';

const predefinedUsers: User[] = [
	{
		name: 'Jožko Mrkvička',
		login: 'admin',
		password: 'admin',
		address: 'Martin',
	},
	{
		name: 'Ferko Muller',
		login: 'admin1',
		password: 'admin1',
		address: 'Praha',
	},
];

interface IFormInput {
	login: string;
	password: string;
}

const LoginForm: FC = () => {
	const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();
	const [error, setError] = useState<string>('');
	const { setUser } = useContext(UserContext)!;
	const history = useHistory();

	const onSubmit = (data: IFormInput) => {
		const user = predefinedUsers.find(u => u.login === data.login && u.password === data.password);

		if (user) {
			setUser(user);
			history.push('/user-detail');
		} else {
			setError('Invalid login or password');
		}
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: 4,
					boxShadow: 3,
					borderRadius: 2,
					backgroundColor: '#fff',
				}}
			>
				<Typography variant="h4" component="h1" gutterBottom>
					Login
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
					<Controller
						name="login"
						control={control}
						defaultValue=""
						rules={{ required: 'Login is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label="Login"
								fullWidth
								margin="normal"
								variant="outlined"
								error={!!errors.login}
								helperText={errors.login ? errors.login.message : ''}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						defaultValue=""
						rules={{ required: 'Password is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label="Password"
								type="password"
								fullWidth
								margin="normal"
								variant="outlined"
								error={!!errors.password}
								helperText={errors.password ? errors.password.message : ''}
							/>
						)}
					/>
					{error && <Typography color="error">{error}</Typography>}
					<Button type="submit" variant="contained" color="primary" fullWidth>
						Login
					</Button>
				</form>
			</Box>
			<Box
				sx={{
					marginTop: 4,
					padding: 2,
					backgroundColor: '#f9f9f9',
					borderRadius: 1,
					width: '100%',
					textAlign: 'left',
					boxShadow: 1,
				}}
			>
				<Typography variant="subtitle1" gutterBottom>
					Test users:
				</Typography>
				<Typography variant="body2">User: admin | Password: admin</Typography>
				<Typography variant="body2">User: admin1 | Password: admin1</Typography>
			</Box>
		</Container>
	);
};

export default LoginForm;