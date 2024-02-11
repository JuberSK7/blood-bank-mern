import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please Provide All feild*");
    }
    store.dispatch(userLogin({ email, password, role }));
    console.log("login", email, password, role);
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  role,
  email,
  password,
  name,
  organisationName,
  hospitalName,
  website,
  address,
  phone
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        role,
        email,
        password,
        name,
        organisationName,
        hospitalName,
        website,
        address,
        phone,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
