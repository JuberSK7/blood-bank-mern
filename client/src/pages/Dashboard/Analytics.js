import React, { useEffect, useState } from "react";
import API from "../../services/API";
import Header from "../../component/shared/Layout/Header";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../component/shared/Spinner";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const { loading, error } = useSelector((state) => state.auth);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  const getBloodGroupData = async (req, res) => {
    try {
      const { data } = await API.get("/analytics/bloodGroupdata");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
      // res.status(500).send({
      //   success: false,
      //   message: "Error In Blood Group Data",
      //   error,
      // });
    }
  };
  useEffect(() => {
    getBloodGroupData();
  }, []);

  const getBloodRecord = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecord();
  }, []);
  return (
    <div>
      <Header />
      {error && toast.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="d-flex flex-row flex-wrap">
            {data?.map((record, i) => (
              <div
                className="card m-2 p-1"
                key={i}
                style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
              >
                <div className="card-body">
                  <h1 className="card-title bg-light text-dark text-center mb-3">
                    {record.bloodGroup}
                  </h1>
                  <p className="card-text">
                    Total In : <b>{record.totalIn}</b> ml
                  </p>
                  <p className="card-text">
                    Total Out : <b>{record.totalOut}</b> ml
                  </p>
                </div>
                <div className="card-footer text-light bg-dark text-center">
                  Total Available : <b>{record.availableBlood}</b> ml
                </div>
              </div>
            ))}
          </div>
          <div className="container">
            <h1>Recent Blood Transaction</h1>
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
                {inventoryData?.map((record) => (
                  <tr key={record.id}>
                    <th>{record.bloodGroup}</th>
                    <td>{record.inventoryType}</td>
                    <td>
                      {record.quantity} {"ml"}
                    </td>
                    <td>{record.email}</td>
                    <td>
                      {" "}
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
