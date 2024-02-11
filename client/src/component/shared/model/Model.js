import React, { useState } from "react";
import InputType from "../Form/InputType";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import API from '../../../services/API';

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleModelsubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return toast.warning("Please Provide all feilds* !");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        toast.success("New Record Created !");
        setTimeout(() => {
          window.location.reload();
        }, 5000)
        
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message)
      setTimeout(() => {
        window.location.reload();
      }, 5000)
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Manage Blood Record
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex mb-3">
                Blood Type : &nbsp;
                <div className="form-check  ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    className="form-check-input"
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    defaultChecked
                  />
                    <lable htmlFor="in" className="form-check-lable">
                  {" "}
                  IN
                </lable>
                </div>
              
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    className="form-check-input"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    
                  />
                     <lable htmlFor="out" className="form-check-lable">
                  {" "}
                  OUT
                </lable>
                </div>
             
              </div>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option defaultValue={'Open this select menu'}>Open this select menu</option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
                "O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"
              </select>
              <InputType
                lableText={"Donar Email"}
                lableFor={"donarEmail"}
                inputType={"email"}
                value={email}
                name={""}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputType
                lableText={"Quantity (ml)"}
                lableFor={"quantity"}
                inputType={"Number"}
                value={quantity}
                name={""}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModelsubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
