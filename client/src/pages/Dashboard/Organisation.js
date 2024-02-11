import React, { useState, useEffect } from "react";
import Layout from "../../component/shared/Layout/Layout";
import Spinner from "../../component/shared/Spinner";
import API from "../../services/API";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";

const Organisation = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.auth);

  const getOrgRecord = async () => {
    try {
      if (user?.role === "organisation") {
        const { data } = await API.get("/inventory/get-organisation");
        console.log(data);
        if (data?.success) {
          setData(data?.organisations);
        }
      }

      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organisation-for-hospital"
        );
        console.log(data);
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrgRecord();
  }, [user]);
  return (
    <Layout>
      {error && toast.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <table className="table my-4">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Time & Data</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((org) => (
              <tr key={org.id}>
                <th>{org.name}</th>
                <td>{org.email}</td>
                <td>{org.phone}</td>
                <td>{org.address}</td>
                <td>{moment(org.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Organisation;
