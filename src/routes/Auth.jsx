import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const auth = useAuth();
	const navigate = useNavigate();
	const isRegister = useLocation().pathname.includes('/register');
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleRegisterWithEmail = (event) => {
		event.preventDefault();
		console.log('registering');
		auth.registerWithEmail(email, password)
			.then(() => {
				navigate('/');
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const handleLoginWithEmail = (event) => {
		event.preventDefault();
		console.log('logging in');
		auth.loginWithEmail(email, password)
			.then(() => {
				navigate('/');
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const handleLoginWithGoogle = () => {
		auth.loginWithGoogle()
			.then(() => {
				navigate('/');
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const handleLoginWithTwitter = () => {
		auth.loginWithTwitter()
			.then(() => {
				navigate('/');
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<div className="flex flex-col items-center justify-center h-[90vh]">
			<h1 className="text-4xl font-bold mb-8">{isRegister ? 'Register' : 'Login'}</h1>
			{error && <div className="text-red-500 mb-4">{error}</div>}
			<form className="w-full max-w-sm" onSubmit={isRegister ? handleRegisterWithEmail : handleLoginWithEmail}>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="email">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="password">
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={handlePasswordChange}
						required
					/>
				</div>
				{isRegister && (
					<div className="mb-4">
						<label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
							Confirm Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="confirmPassword"
							type="password"
							placeholder="Confirm Password"
							required
						/>
					</div>
				)}
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					{isRegister ? 'Register' : 'Login'} with Email
				</button>
			</form>
			<div className="mt-8 flex justify-center">
				<button
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
					onClick={handleLoginWithGoogle}
				>
					<FaGoogle className="inline-block mr-2" />
					Login with Google
				</button>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					onClick={handleLoginWithTwitter}
				>
					<FaTwitter className="inline-block mr-2" />
					Login with Twitter
				</button>
			</div>
			<div className="mt-4">
				<Link className="text-blue-500 hover:text-blue-700" to={isRegister ? '/auth' : '/auth/register'}>
					{isRegister ? 'Already have an account? Login here.' : "Don't have an account? Register here."}
				</Link>
			</div>
		</div>
	);
};

export default Auth;
