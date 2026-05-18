import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {

  return (

    <div className="drawer lg:drawer-open">

      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content p-6">

        <Outlet />

      </div>

      <div className="drawer-side">

        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-72 min-h-full bg-base-200 space-y-2">

          <li>

            <NavLink to="/dashboard">

              Dashboard Home

            </NavLink>

          </li>

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
          <li>

            <NavLink to="/dashboard/manage-contests">

              Manage Contests

            </NavLink>

          </li>
          <li>

            <NavLink to="/dashboard/participated-contests">

              Participated Contests

            </NavLink>

          </li>

          <li>

            <NavLink to="/">

              Back Home

            </NavLink>

          </li>

        </ul>

      </div>

    </div>

  );

};

export default DashboardLayout;