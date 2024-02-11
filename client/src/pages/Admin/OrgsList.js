import React, { useEffect, useState } from "react";
import Layout from "../../component/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { toast } from "react-toastify";
import Spinner from "../../component/shared/Spinner";
import { useSelector } from "react-redux";

const OrgsList = () => {
  const [data, setData] = useState([]);
  const { loading, error } = useSelector((state) => state.auth);

  const getHospitalRecord = async () => {
    try {
      const { data } = await API.get("/admin/orgs-list");
      console.log(data);
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitalRecord();
  }, []);

  const handleDeleteOrg = async (id) => {
    try {
      let answer = window.prompt("Are You Sure for Delete", "Sure");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-org/${id}`);
      alert(data?.message);
      console.log(data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((donar) => (
              <tr key={donar.id}>
                <th>{donar.organisationName}</th>
                <td>{donar.email}</td>
                <td>{donar.phone}</td>
                <td>{donar.address}</td>
                <td>{moment(donar.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteOrg(donar._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default OrgsList;
