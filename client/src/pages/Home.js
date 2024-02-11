import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../component/shared/Spinner";
import { toast } from "react-toastify";
import Layout from "../component/shared/Layout/Layout";
import Modal from "../component/shared/model/Model";
import { useNavigate } from "react-router-dom";
import API from "../services/API";
import moment from 'moment'

const Home = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const getBloodRecord = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
     
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecord();
  }, []);
  return (
    <>
      <Layout>
        {user?.role === 'admin' && navigate('/admin')}
        {error && toast.error(error)}
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="container m3-4 my-4">
              <h4
                className=" ms-4"
                data-toggle="modal"
                data-target="#exampleModal"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-slolid fa-plus text-success py-4"></i>
                Add Inventory
              </h4>
              <Modal />

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory(Available)</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donar Email</th>
                    <th scope="col">Time & Data</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((record) => (
                    <tr key={record.id}>
                      <th >{record.bloodGroup}</th>
                      <td>{record.inventoryType}</td>
                      <td>{record.quantity} {'ml'}</td>
                      <td>{record.email}</td>
                      <td> {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
