import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { repeat } from 'lodash';
import { Button, ThemeProvider} from "@material-tailwind/react";
import ReactLoading from 'react-loading';


const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const auth = useAuth();
	const navigate = useNavigate();
	const urlParams = new URLSearchParams(window.location.search);
	const [repeatPassword,setRepeatPassword] = useState('');
	const [verificationMessage,setVerificationMessage] = useState(false)
	const[isSubmitting,setIsSubmitting] = useState(false)
	const[successMessage,setSuccessMessage] = useState(false)
	const resetPassword = (useLocation().pathname.includes('/u/resetpassword'));
	const verification = (useLocation().pathname.includes('/u/verify') && urlParams.get('mode')=="verifyEmail");	

	const isRegister = useLocation().pathname.includes('/u/register');
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	
	
	const oobCode = urlParams.get('oobCode');
	
	// Output: QKLWUkJGquEeVh_0SR-FFyFXzUGMmAsj6fcJYTkL_WoAAAGIhm9zFA
	
	useEffect(() => {
/* 		if (window.location.href=="http://localhost:3000/u/resetpassword" && resetPassword ===false){
			navigate('/u/login')
		} */
		if (auth.currentUser) {
			navigate('/');
		}
	
	});
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};
	const handleRepeatPasswordChange = (event) => {
		setRepeatPassword(event.target.value);}

	const handleRegisterWithEmail = (event) => {
		//setIsSubmitting(true)
		event.preventDefault();
		setIsSubmitting(true)
		if(repeatPassword!==password){
			setError('Passwords do not match.')
			setIsSubmitting(false)
		}
		else if(password.length<8){
			setError('Password must be at least 8 characters long.')
			setIsSubmitting(false)
		}
		else{
		auth.registerWithEmail(email, password)
			.then(() => {
				setVerificationMessage(true)
				setIsSubmitting(false)
			})
			.catch((error) => {
				console.log(error)
				setIsSubmitting(false)
			});
		}
		
	};

	const handleLoginWithEmail = (event) => {
		//setIsSubmitting(true)
		event.preventDefault();
		console.log('logging in');
		auth.loginWithEmail(email, password)
			.then((result) => {
				console.log(result)
				if(result ==="verification error"){
					setError("Please verify your email before logging in.")
					setVerificationMessage(true)					
				}
				else if (result ==="user not found") {
					setError("Oops! Incorrect email or password.");
				}
				else{
				navigate('/');
				setIsSubmitting(false)
			}
			})
			.catch((error) => {
				console.log(error)
				if(error.message =="Firebase: Error (auth/user-not-found)." ||error.message =="Firebase: Error (auth/wrong-password)." ){
					setError("Oops! Incorrect email or password.");
				}
				else{
					setError(error.message)
				}			
					
								
				
				console.log(error)
			});
	};

	const handleLoginWithGoogle = () => {
		auth.loginWithGoogle()
			.then(() => {
				navigate('/');
			})
			.catch((error) => {
				console.log(error)
			});
	};

	const sendResetPasswordMail = (event)	=> {
		setIsSubmitting(true)
		event.preventDefault();

		
		auth.resetPassword(email)

		.then((result) => {
			console.log(result)
			setIsSubmitting(false)
			setSuccessMessage(true)
		}
		)
		.catch((error) => {
			console.log(error)
			if(error.message==="Firebase: Error (auth/user-not-found)."){
				setError("No user found with this email address.")
			}
			setIsSubmitting(false)
		}	
		)
	
	}
	

	const handlePasswordResetConfirmation = (event) => {
		setIsSubmitting(true)
		event.preventDefault();

		if(repeatPassword!==password){
			setError('Passwords do not match.')
			setIsSubmitting(false)
		}
		else if(password.length<8){
			setError('Password must be at least 8 characters long.')
			setIsSubmitting(false)
		}
		else{
		auth.handlePasswordReset(oobCode,password)
		.then((result) => {
			console.log(result)
			setSuccessMessage(true)
			setIsSubmitting(false)
			
		}
		)
		.catch((error) => {
			if(error.message =="Firebase: Error (auth/invalid-action-code)."){
				setError("Invalid or expired link. Please request another link.");
			}
			else{
				setError(error.message)
			}
			setIsSubmitting(false)
		}
		)
	}
	}

	const handleResendVerificationEmail = (event) => {
		setIsSubmitting(true)
		event.preventDefault();
		
		auth.resendEmailVerification()
		.then((result) => {
			setSuccessMessage(true)
			setIsSubmitting(false)
		}
		)
		.catch((error) => {
			setIsSubmitting(false)
		}
		)
	}

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

	<div className="flex flex-col items-center justify-center h-[60vh] mt-10 mx-auto items-center w-[300px]">
		{/* 
			<h1 className="text-4xl font-bold mb-8">{isRegister ? 'Register' : 'Login'}</h1>
			{error && <div className="text-red-500 mb-4">{error}</div>}
			<form className="w-full max-w-sm" onSubmit={isRegister ? handleRegisterWithEmail : handleLoginWithEmail}>
				<div className="mb-4">
					<label className="block text-gray-700 dark:text-zinc-300 font-bold mb-2" htmlFor="email">
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 dark:text-zinc-300 font-bold mb-2" htmlFor="password">
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline"
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
						<label className="block text-gray-700 dark:text-zinc-300 font-bold mb-2" htmlFor="confirmPassword">
							Confirm Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline"
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
				<button
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
					onClick={handleLoginWithGoogle}
				>
					<FaGoogle className="inline-block mr-2" />
					Login with Google
				</button>
			</form>
			<div className="mt-8 flex justify-center">
				
				{/* <button
					className="bg-blue-500 hover:bg-blue-700 text-white
              font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					onClick={handleLoginWithTwitter}
				>
					<FaTwitter className="inline-block mr-2" />
					Login with Twitter
				</button> 
			</div>
			<div className="mt-4">
				<Link className="text-zinc-200 hover:text-zinc-200" to={isRegister ? '/auth' : '/auth/register'}>
					{isRegister ? 'Already have an account? Login here.' : "Don't have an account? Register here."}
				</Link>
			</div>
 */}
{
verificationMessage==false ?
(resetPassword=== false ? 
<div className="mb-20 w-[300px]">
	
	
		<div >
			<h1 className="text-xl mb-8">{isRegister ? 'Create an account' : 'Login'}	</h1>
			
		<form onSubmit={isRegister ? handleRegisterWithEmail : handleLoginWithEmail}>
		<div class="relative z-0 w-full mb-6 group">


			<input value={email} onChange={handleEmailChange} type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
		</div>
		<div class="relative z-0 w-full mb-6 group">
			<input onChange={handlePasswordChange} type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
		</div>
		{isRegister ? 
		<div class="relative z-0 w-full mb-6 group">
			<input onChange={handleRepeatPasswordChange} type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
			<label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
		</div>
		:null}
		<div class="grid md:grid-cols-2 md:gap-6">

		</div>
		
		
		<Button type="submit" className={`${isSubmitting ? "opacity-50 pointer-events-none" :""} bg-green-400`}> {isSubmitting  ? <ReactLoading type="spin" width={17} height={17} color="#ffffff"/> : <span>Submit</span>}</Button>
		

		</form>
		{error && <div> <div className="text-red-500 text-sm mb-8 mt-5">{error}</div>
		</div>}
		<div className="mt-4">

							{isRegister ===false ? 
							<div className="text-zinc-600 text-sm" ><p><a href="/u/resetpassword" className="underline cursor-pointer"> Forgot your password?</a></p> </div>:null}
					
					</div>

		</div>
		<div className="">
		<div className="flex items-center mt-10 mb-10">
		<div class="border-b border-gray-300 w-[200px] mr-3"></div>
		<span className="text-sm text-gray-400">OR</span>
		<div class="border-b border-gray-300 w-[200px] ml-3 "></div>
		</div>
		<button
							className=" py-4 px-4  w-full border rounded focus:outline-none focus:shadow-outline hover:opacity-80"
							onClick={handleLoginWithGoogle}
						>
							<FaGoogle className="inline-block mr-2 mb-1" />
							<span className="font-normal ">Continue with Google</span>
							
						</button>

						
		<div className="mt-4">
						
							{isRegister ? 
							<div className="mt-2 text-center"><p className="text-zinc-600 text-sm "> Already have an account? Login <a href="/u/login" className="text-green-400">here.</a></p> </div>:<div><p className="text-zinc-600 text-sm">Don't have an account? <a href="/u/register" className="text-green-400">Register now.</a></p> </div>}
						
					</div>
				</div>

				</div>

			:
			
			oobCode === null ? 
			<div className="mb-20 w-[300px]">
				<h1 className="text-xl mb-8">Reset Password	</h1>
				<p className="text-sm text-zinc-600 mb-10">Enter your email address and we will send you a link to reset your password.</p>
					<form onSubmit={sendResetPasswordMail}>
					<div class="relative z-0 w-full mb-6 group">
						<input value={email} onChange={handleEmailChange} type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
						<label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
					</div>
					<Button type="submit" className={`${isSubmitting ? "opacity-50 pointer-events-none" :""} bg-green-400`}> {isSubmitting  ? <ReactLoading type="spin" width={17} height={17} color="#ffffff"/> : <span>Send Link</span>}</Button>
					</form>
					{error &&  <div className="text-red-500 text-sm mb-8 mt-5">{error}</div>}
					{successMessage &&  <div className="text-green-500 text-sm mb-8 mt-5">Email sent successfully</div>}
					
				</div>

				: 
				
			<div className="mb-20 w-[300px]">
				{successMessage=== false ? 
				<div>
				<h1 className="text-xl mb-8">Pick a New Password	</h1>
				<p className="text-sm text-zinc-600 mb-10">You are about to reset your password. Please make sure your new password is longer than 8 characters.</p> 
					<form onSubmit={handlePasswordResetConfirmation}>
{/* 					<div class="relative z-0 w-full mb-6 group">
						<input value={email} onChange={handleEmailChange} type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
						<label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
					</div> */}

					<div class="relative z-0 w-full mb-6 group">
							<input onChange={handlePasswordChange} type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
							<label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
						</div>
		
				<div class="relative z-0 w-full mb-6 group">
					<input onChange={handleRepeatPasswordChange} type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
					<label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
				</div>
				{error && <div className="text-red-500 text-sm mb-8 mt-5">{error}</div>}
				
					<Button type="submit" className={`${isSubmitting ? "opacity-50 pointer-events-none" :""} bg-green-400`}> {isSubmitting  ? <ReactLoading type="spin" width={17} height={17} color="#ffffff"/> : <span>Reset Password</span>}</Button>
					
					</form>
					</div>:
						<div className="text-md mb-8 mt-5 items-center">
							
							<svg className="items-center mx-auto text-green-500" width={60} fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
		<p className="mx-auto text-center mt-4 text-zinc-600">
							Password reset successfully. <a className="underline" href="/u/login"> Login</a> to continue.
							</p></div>}
					

				</div>
)
			:

			<div className="mb-20 w-[300px]">
				<h1 className="text-xl mb-8">We've send a verification link to {email!==null ? email: "your email"}!</h1>
				<p className="text-sm text-zinc-600 mb-10">Please follow it to complete your registration. If you didn't get the email, try again from the link below.</p>
				<Button onClick={handleResendVerificationEmail}  className={`${isSubmitting ? "opacity-50 pointer-events-none" :""} bg-green-400`}> {isSubmitting  ? <ReactLoading type="spin" width={17} height={17} color="#ffffff"/> : <span>Resend Link</span>}</Button>
				{successMessage && <div className="text-zinc-500 text-sm mb-8 mt-5">We've successMessage the verification email. Please check your inbox.</div>}
				</div>
			
			}

				</div>
	);
};

export default Auth;
