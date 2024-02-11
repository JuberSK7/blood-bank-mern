import React, { useEffect, useState } from "react";
import Layout from "../../component/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";
import Spinner from "../../component/shared/Spinner";
import {toast} from 'react-toastify'
import moment from 'moment'

const Donar = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getDonarsRecord = async () => {
    try {
      const { data } = await API.get("/inventory/get-donars");
      console.log(data);
    if(data?.success){
    setData(data?.donars)

    }
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonarsRecord();
  }, []);
  return (
    <Layout>
          {error && toast.error(error)}
        {loading ? (
          <Spinner /> 
        ):(
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
              {data?.map((donar) => (
                <tr key={donar.id}>
                  <th >{donar.name || donar.organisationName + "  (ORG)"}</th>
                  <td>{donar.email}</td>
                  <td>{donar.phone}</td>
                  <td>{donar.address}</td>
                  <td>{moment(donar.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
      )}

      
    </Layout>
  );
};

export default Donar;
