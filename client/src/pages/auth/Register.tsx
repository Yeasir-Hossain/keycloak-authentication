
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router';
import { Button } from '@/components/shared/button';
import { Input } from '@/components/shared/input';
import { RegisterFormData, registerSchema } from '@/validations';

export default function Register() {
	const [register, { isLoading }] = useRegisterMutation();
	const navigate = useNavigate();

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
		},
	});

	const { handleSubmit, register: formRegister, formState: { errors }, setError } = form;

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await register(data).unwrap();
			navigate('/login');
		} catch (error: any) {
			setError('root', { message: error.message || 'Registration failed' });
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input {...formRegister('email')} placeholder="Email" />
				{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

				<Input {...formRegister('password')} type="password" placeholder="Password" />
				{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

				<Input {...formRegister('firstName')} placeholder="First Name" />
				{errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

				<Input {...formRegister('lastName')} placeholder="Last Name" />
				{errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

				{errors.root && <p className="text-red-500 text-sm my-2">{errors.root.message}</p>}
				<Button type="submit" disabled={isLoading}>
					{isLoading ? 'Registering...' : 'Register'}
				</Button>
			</form>
		</FormProvider>
	);
}
