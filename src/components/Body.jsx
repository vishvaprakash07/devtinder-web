/* eslint-disable no-unused-vars */
import NavBar from "./NavBar";
import { useNavigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true});
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status == 401){
        navigate("/login");
      }
      else {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if(!userData) {
      fetchUser();
    }
  }, []);


  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  );
};

export default Body;