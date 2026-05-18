import { NavLink, Outlet } from "react-router-dom";

import useRole from "../hooks/useRole";

const DashboardLayout = () => {

  const [role] = useRole();

  return (

    <div className="drawer lg:drawer-open">

      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content p-6">

        <label
          htmlFor="dashboard-drawer"
          className="btn btn-primary drawer-button lg:hidden mb-4"
        >

          Open Dashboard

        </label>

        <Outlet />

      </div>

      <div className="drawer-side">

        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content space-y-2">

          <h2 className="text-3xl font-bold mb-6">

            Dashboard
          </h2>

          {/* admin menu */}

          {
            role === "admin" && (

              <>

                <li>

                  <NavLink to="/dashboard/manage-users">

                    Manage Users

                  </NavLink>

                </li>

                <li>

                  <NavLink to="/dashboard/manage-contests">

                    Manage Contests

                  </NavLink>

                </li>

              </>

            )
          }

          {/* creator menu */}

          {
            role === "creator" && (

              <>

                <li>

                  <NavLink to="/dashboard/add-contest">

                    Add Contest

                  </NavLink>

                </li>

                <li>

                  <NavLink to="/dashboard/my-contests">

                    My Contests

                  </NavLink>

                </li>

              </>

            )
          }

          {/* user menu */}

          {
            role === "user" && (

              <>

                <li>

                  <NavLink to="/dashboard/participated-contests">

                    Participated Contests

                  </NavLink>

                </li>

                <li>

                  <NavLink to="/dashboard/winning-contests">

                    Winning Contests

                  </NavLink>

                </li>

              </>

            )
          }

          <div className="divider"></div>

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

        </ul>

      </div>

    </div>

  );

};

export default DashboardLayout;