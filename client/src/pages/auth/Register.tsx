
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '@/features/auth/authSlice';
import { Link, useNavigate } from 'react-router';
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
			setError('root', { message: error?.data?.message || 'Registration failed' });
		}
	};

	return (
		<div className='flex flex-col gap-3 justify-center items-center max-w-screen-sm mx-auto min-h-screen'>
			<h1 className='text-xl font-bold'>Register</h1>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Input {...formRegister('firstName')} placeholder="First Name" />
					{errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

					<Input {...formRegister('lastName')} placeholder="Last Name" />
					{errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

					<Input {...formRegister('email')} placeholder="Email" />
					{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

					<Input {...formRegister('password')} type="password" placeholder="Password" />
					{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

					{errors.root && <p className="text-red-500 text-sm my-2">{errors.root.message}</p>}
					<Button type="submit" disabled={isLoading} className='w-full'>
						{isLoading ? 'Registering...' : 'Register'}
					</Button>
				</form>
			</FormProvider>
			<p className="mt-4 text-center text-sm">
				Already have an account?
				<Link to="/login" className="text-blue-500 hover:underline ml-1">
					Login here
				</Link>
			</p>
		</div>
	);
}
