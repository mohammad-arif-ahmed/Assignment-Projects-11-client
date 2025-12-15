
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"; 
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth"; 
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth"; 
const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [showPassword, setShowPassword] = useState(false); 

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                toast.success("Login successful!");
                
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message || "Login failed! Check credentials.");
            });
    };
    
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                toast.success("Google Login successful!");
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                toast.error("Google Login failed!");
            });
    };
    
    const handleForgotPassword = (e) => {
        const emailInput = document.getElementById('email').value; 
        
        if (!emailInput) {
            toast.error("Please enter your email in the input field first.");
            return;
        }
        
        
        
        sendPasswordResetEmail(auth, emailInput) 
            .then(() => {
                toast.success(`Password reset link sent to ${emailInput}`);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error sending reset email! Check email address.");
            });
    };


    return (
        <div className="hero min-h-screen">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h2 className="text-3xl font-bold text-center pt-8">Login Now</h2>
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        {/* Added ID for Forgot Password function */}
                        <input type="email" id="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} // Type toggle logic
                                name="password" 
                                placeholder="password" 
                                className="input input-bordered w-full" 
                                required 
                            />
                            {/* Password Visibility Toggle Button */}
                            <span 
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoEyeOffOutline className="text-xl"/> : <IoEyeOutline className="text-xl"/>}
                            </span>
                        </div>
                        {/* Forgot Password Link */}
                        <label className="label">
                            <a 
                                onClick={handleForgotPassword} 
                                className="label-text-alt link link-hover text-red-500"
                            >
                                Forgot password?
                            </a>
                        </label>
                    </div>
                    
                    <div className="form-control mt-2">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                
                {/* Social Login */}
                <div className="px-8 pb-8">
                    <p className="text-center mb-4">Or Login with</p>
                    <button onClick={handleGoogleSignIn} className="btn btn-outline w-full gap-2">
                        <FaGoogle />
                        Google
                    </button>
                    <p className="mt-4 text-center">
                        Don't have an account? <Link to="/register" className="text-primary font-bold">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;