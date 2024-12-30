import {FC} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';

interface UserDetailFormProps {
	defaultValues: {
		name: string;
		address: string;
	};
	onSubmit: (data: { name: string; address: string }) => void;
}

const UserDetailForm: FC<UserDetailFormProps> = ({ defaultValues, onSubmit }) => {

	const { control, handleSubmit } = useForm({
		defaultValues,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Typography variant="h5" component="h2" gutterBottom>
				Edit User Details
			</Typography>
			<Controller
				name="name"
				control={control}
				rules={{ required: 'Name is required' }}
				render={({ field, fieldState }) => (
					<TextField
						{...field}
						label="Name"
						fullWidth
						margin="normal"
						variant="outlined"
						error={!!fieldState.error}
						helperText={fieldState.error?.message}
					/>
				)}
			/>
			<Controller
				name="address"
				control={control}
				rules={{ required: 'Address is required' }}
				render={({ field, fieldState }) => (
					<TextField
						{...field}
						label="Address"
						fullWidth
						margin="normal"
						variant="outlined"
						error={!!fieldState.error}
						helperText={fieldState.error?.message}
					/>
				)}
			/>
			<Button type="submit" variant="contained" color="primary" fullWidth>
				Edit
			</Button>
		</form>
	);
};

export default UserDetailForm;