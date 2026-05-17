import { Link, NavLink } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navbar = () => {

  const {
    user,
    logoutUser,
  } = useAuth();

  const handleLogout = async () => {

    await logoutUser();

  };

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
    </>
  );

  return (

    <div className="bg-base-100 shadow-md sticky top-0 z-50">

      <div className="navbar max-w-7xl mx-auto">

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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >

              {links}

            </ul>

          </div>

          <Link
            to="/"
            className="text-2xl font-bold"
          >

            ContestHub

          </Link>

        </div>

        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal px-1 gap-2">

            {links}

          </ul>

        </div>

        <div className="navbar-end">

          {
            user ? (

              <div className="dropdown dropdown-end">

                <div
                  tabIndex={0}
                  role="button"
                  className="avatar"
                >

                  <div className="w-10 rounded-full">

                    <img src={user.photoURL} />

                  </div>

                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >

                  <li>

                    <p>
                      {user.displayName}
                    </p>

                  </li>

                  <li>

                    <Link to="/dashboard">
                      Dashboard
                    </Link>

                  </li>

                  <li>

                    <button onClick={handleLogout}>
                      Logout
                    </button>

                  </li>

                </ul>

              </div>

            ) : (

              <div className="flex gap-2">

                <Link
                  to="/login"
                  className="btn btn-outline btn-sm"
                >

                  Login

                </Link>

                <Link
                  to="/register"
                  className="btn btn-primary btn-sm"
                >

                  Register

                </Link>

              </div>

            )
          }

        </div>

      </div>

    </div>

  );

};

export default Navbar;