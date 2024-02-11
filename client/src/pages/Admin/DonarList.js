import React, { useEffect, useState } from "react";
import Layout from "../../component/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { toast } from "react-toastify";
import Spinner from "../../component/shared/Spinner";
import { useSelector } from "react-redux";

const DonarList = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getDonarsRecord = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      console.log(data);
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonarsRecord();
  }, []);

  const handleDeleteDonar = async (id) => {
    try {
      let answer = window.prompt("Are You Sure for Delete", "Sure");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
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
              <tr key={donar._id}>
                <th>{donar.name || donar.organisationName + "  (ORG)"}</th>
                <td>{donar.email}</td>
                <td>{donar.phone}</td>
                <td>{donar.address}</td>
                <td>{moment(donar.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDeleteDonar(donar._id)}
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

export default DonarList;
