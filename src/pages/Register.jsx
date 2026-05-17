import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import axios from "axios";

import useAuth from "../hooks/useAuth";

const Register = () => {

  const {
    createUser,
    updateUserProfile,
  } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const name = form.name.value;

    const photo = form.photo.value;

    const email = form.email.value;

    const password = form.password.value;

    try {

      // create firebase user
      await createUser(email, password);

      // update profile
      await updateUserProfile({
        displayName: name,
        photoURL: photo,
      });

      // save user to database
      const userInfo = {
        name,
        photo,
        email,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        userInfo
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: error.message,
      });

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-[80vh] flex justify-center items-center">

      <div className="card bg-base-100 w-full max-w-md shadow-2xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center">

            Create Account

          </h2>

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >

            <div>

              <label className="label">
                Name
              </label>

              <input
                type="text"
                name="name"
                required
                className="input input-bordered w-full"
              />

            </div>

            <div>

              <label className="label">
                Photo URL
              </label>

              <input
                type="text"
                name="photo"
                required
                className="input input-bordered w-full"
              />

            </div>

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
                  : "Register"
              }

            </button>

          </form>

          <p className="text-center">

            Already have account?

            <Link
              to="/login"
              className="text-primary ml-1"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

};

export default Register;