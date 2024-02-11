import React from "react";
import Layout from "../../component/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            {" "}
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <hr />
          <p>
            The Blood Bank App Admin Page serves as the central control hub for
            managing and overseeing all operations within a blood bank system.
            Designed with efficiency and precision in mind, this user interface
            provides administrators with the tools and information they need to
            ensure the smooth functioning of the blood bank and the critical
            task of saving lives through blood donation. Here are the key
            components and features of the Blood Bank App. The admin page opens
            with a comprehensive dashboard that offers a snapshot of critical
            data. This includes real-time statistics on blood inventory levels,
            donation activities, pending requests, and recent donor
            registrations. Admins have the authority to manage user accounts,
            including staff members, volunteers, and donors. They can add, edit,
            or deactivate accounts, ensuring that only authorized individuals
            have access to the system. This section provides tools to manage the
            blood inventory efficiently. Admins can update blood stock levels,
            track blood expiration dates, and record donations and withdrawals
            accurately. Admins can oversee the donor registration process,
            verify donor information, and maintain a complete database of
            registered donors. They can also manage appointments for blood
            donations.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
