import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import useAuth from "../hooks/useAuth";

const Login = () => {

  const {
    loginUser,
    googleLogin,
  } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const from = location.state || "/";

  // login
  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const email = form.email.value;

    const password = form.password.value;

    try {

      await loginUser(email, password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: error.message,
      });

    } finally {

      setLoading(false);

    }

  };

  // google login
  const handleGoogleLogin = async () => {

    try {

      await googleLogin();

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: error.message,
      });

    }

  };

  return (

    <div className="min-h-[80vh] flex justify-center items-center">

      <div className="card bg-base-100 w-full max-w-md shadow-2xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center">

            Login Now

          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            <div>

              <label className="label">
                Email
              </label>

              <input
                type="email"
                name="email"
                required
                className="input input-bordered w-full"
              />

            </div>

            <div>

              <label className="label">
                Password
              </label>

              <input
                type="password"
                name="password"
                required
                className="input input-bordered w-full"
              />

            </div>

            <button
              className="btn btn-primary w-full"
            >

              {
                loading
                  ? "Loading..."
                  : "Login"
              }

            </button>

          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >

            Continue with Google

          </button>

          <p className="text-center">

            New here?

            <Link
              to="/register"
              className="text-primary ml-1"
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

};

export default Login;