import React, {useState, useEffect} from 'react'
import Layout from '../../component/shared/Layout/Layout'
import { useSelector } from 'react-redux'
import Spinner from '../../component/shared/Spinner'
import {toast} from 'react-toastify'
import moment from 'moment'
import API from '../../services/API'

const Hospital = () => {
    const [data, setData] = useState([]);
    const { loading, error } = useSelector((state) => state.auth);

    const getHospitalRecord = async () => {
      try {
        const { data } = await API.get("/inventory/get-hospital");
        console.log(data);
      if(data?.success){
      setData(data?.hospital)
  
      }
      
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
        getHospitalRecord()
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
                  <th >{donar.hospitalName}</th>
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
}

export default Hospital
