import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

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
    </>
  );

  return (

    <div className="bg-base-100 shadow-md sticky top-0 z-50">

      <div className="navbar max-w-7xl mx-auto">

        {/* mobile */}
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

        {/* desktop */}
        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal px-1 gap-2">

            {links}

          </ul>

        </div>

        {/* right */}
        <div className="navbar-end gap-2">

          <button className="btn btn-outline btn-sm">

            Login

          </button>

          <button className="btn btn-primary btn-sm">

            Register

          </button>

        </div>

      </div>

    </div>

  );

};

export default Navbar;