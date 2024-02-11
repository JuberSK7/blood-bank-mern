const userModel = require("../models/userModel");


//// Get Donar Controller
const getDonarListController = async(req, res) => {
try {
    const donarData = await userModel.find({role: 'donar'}).sort({createdAt: -1});
    return res.status(200).send({
        success: true,
        Totalcount: donarData.length,
        message: ' Donar List Get Successfully',
        donarData,
    })
} catch (error) {
    console.log(error);
  return  res.status(500).send({
        success: false,
        message: 'Error in Admin Controller APi',
        error,
    })
}
}
/////////// Get Hospital Controller
const getHospitalListController = async(req, res) => {
    try {
        const hospitalData = await userModel.find({role: 'hospital'}).sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            Totalcount: hospitalData.length,
            message: 'Hospital List Get Successfully',
            hospitalData,
        })
    } catch (error) {
        console.log(error);
      return  res.status(500).send({
            success: false,
            message: 'Error in Hospital Controller APi',
            error,
        })
    }
    }
//////Get Orgs list
const getOrgsListController = async(req, res) => {
    try {
        const orgData = await userModel.find({role: 'organisation'}).sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            Totalcount: orgData.length,
            message: 'Organisation List Get Successfully',
            orgData,
        })
    } catch (error) {
        console.log(error);
       return res.status(500).send({
            success: false,
            message: 'Error in Organisation Controller APi',
            error,
        })
    }
    }


    /////////////Delete Donar controller

    const deleteDonarController = async(req, res) => {
        try {
            await userModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({
                success: true,
                message: "Donar delete Successfully",
            })
        } catch (error) {
           console.log(error);
           return res.status(500).send({
            success: false,
            message: "Errror in Delete Donar Api",
            error,
           }) 
        }
    }

    /////// Delete Hospital Controller
    const deleteHospitalController = async(req, res) => {
        try {
            await userModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({
                success: true,
                message: "Hospital delete Successfully",
            })
        } catch (error) {
           console.log(error);
           return res.status(500).send({
            success: false,
            message: "Errror in Delete Hospital Api",
            error,
           }) 
        }
    }

      /////// Delete Orgs Controller
      const deleteOrgController = async(req, res) => {
        try {
            await userModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({
                success: true,
                message: "Org delete Successfully",
            })
        } catch (error) {
           console.log(error);
           return res.status(500).send({
            success: false,
            message: "Errror in Delete Org Api",
            error,
           }) 
        }
    }


module.exports = {getDonarListController, getHospitalListController, getOrgsListController, deleteDonarController,deleteHospitalController, deleteOrgController};