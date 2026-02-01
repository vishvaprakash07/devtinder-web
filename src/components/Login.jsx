/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [emailId, setEmailId] = useState('vishvaprakash07@gmail.com');
  const [password, setPassword] = useState('Msdhoni@123');
  const [error, setError] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
     const res = await  axios.post(BASE_URL + "/login", {
        email: emailId,
        password: password
      },{ withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID:</legend>
              <input type="text" value={emailId} className="input" placeholder="example@exam.com"
                onChange={(e) => setEmailId(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" value={password} className="input" placeholder="*********"
                onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          {error && <p className="text-red-500 px-3">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login