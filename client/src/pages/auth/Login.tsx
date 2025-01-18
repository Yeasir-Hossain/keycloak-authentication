import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router';
import { Button } from '@/components/shared/button';
import { loginSchema, LoginFormData } from '@/validations';
import { Input } from '@/components/shared/input';

export default function Login() {
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { handleSubmit, register: formRegister, setError, formState: { errors } } = form;

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login(data).unwrap();
			navigate('/');
		} catch (error: any) {
			setError('root', { message: error.message || 'Login failed' });
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input {...formRegister('email')} placeholder="Email" />
				{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

				<Input {...formRegister('password')} type="password" placeholder="Password" />
				{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
				{errors.root && <p className="text-red-500 text-sm mt-4">{errors.root.message}</p>}
				<Button type="submit" disabled={isLoading}>
					{isLoading ? 'Logging in...' : 'Login'}
				</Button>
			</form>
		</FormProvider>
	);
}
