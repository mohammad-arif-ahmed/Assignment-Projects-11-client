import { NavLink } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

import useAuth from "../hooks/useAuth";

const Navbar = () => {

  const {
    user,
    logoutUser,
  } = useAuth();

  const links = (

    <>

      <li>

        <NavLink to="/">

          Home

        </NavLink>

      </li>

      <li>

        <NavLink to="/all-contests">

          All Contests

        </NavLink>

      </li>

      <li>

        <NavLink to="/leaderboard">

          Leaderboard

        </NavLink>

      </li>

      <li>

        <NavLink to="/about">

          About

        </NavLink>

      </li>

      {
        user && (

          <li>

            <NavLink to="/dashboard">

              Dashboard

            </NavLink>

          </li>

        )
      }

    </>

  );

  return (

    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">

      <div className="w-11/12 mx-auto flex justify-between">

        {/* navbar start */}

        <div className="navbar-start">

          <div className="dropdown">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >

              ☰

            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >

              {links}

            </ul>

          </div>

          <NavLink
            to="/"
            className="text-2xl font-bold"
          >

            ContestHub

          </NavLink>

        </div>

        {/* navbar center */}

        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal px-1 gap-2">

            {links}

          </ul>

        </div>

        {/* navbar end */}

        <div className="navbar-end gap-3">

          <ThemeToggle />

          {
            user ? (

              <div className="flex items-center gap-3">

                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border"
                />

                <button
                  onClick={logoutUser}
                  className="btn btn-primary"
                >

                  Logout

                </button>

              </div>

            ) : (

              <NavLink
                to="/login"
                className="btn btn-primary"
              >

                Login

              </NavLink>

            )
          }

        </div>

      </div>

    </div>

  );

};

export default Navbar;