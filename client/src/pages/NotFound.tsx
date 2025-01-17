import { Button } from '@/components/shared/button';
import React from 'react';
import { useNavigate } from 'react-router';

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate('/');
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
				<p className="text-xl text-gray-600 mb-8">Oops! Page Not Found</p>
				<p className="text-gray-500 mb-8">
					The page you are looking for might have been removed,
					had its name changed, or is temporarily unavailable.
				</p>
				<Button
					onClick={handleGoHome}
				>
					Go to Home
				</Button>
			</div>
		</div>
	);
};

export default NotFound;