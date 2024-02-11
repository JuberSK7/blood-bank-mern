import React, {useState, useEffect} from 'react'
import Layout from '../../component/shared/Layout/Layout'
import { useSelector } from "react-redux";
import API from "../../services/API";
import Spinner from "../../component/shared/Spinner";
import {toast} from 'react-toastify'
import moment from 'moment'

const Consumer = () => {
    const { loading, error } = useSelector((state) => state.auth);
    const {user} = useSelector(state => state.auth);
    const [data, setData] = useState([]);
  
    const getDonarsRecord = async () => {
      try {
        const { data } = await API.post("/inventory/get-inventory-hospital", {
            filters: {
                inventoryType: 'out',
                hospital: user?._id
            }
        });
        console.log(data);
      if(data?.success){
      setData(data?.inventory)
    
  
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
                  <th scope="col">Blood Group </th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Email</th>
                  <th scope="col">Time & Data</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((donar) => (
                  <tr key={donar.id}>
                    <th >{donar.bloodGroup}</th>
                    <td>{donar.inventoryType}</td>
                    <td>{donar.quantity}</td>
                    <td>{donar.email}</td>
                    <td>{moment(donar.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
  
        
      </Layout>
    );
}

export default Consumer
