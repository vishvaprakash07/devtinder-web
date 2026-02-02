/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
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

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName: firstName,
        lastName: lastName,
        email: emailId,
        password: password
      },{ withCredentials: true });
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div>
            {!isLoginForm && <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <input type="text" value={firstName} className="input" placeholder="John"
                  onChange={(e) => setFirstName(e.target.value)} />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <input type="text" value={lastName} className="input" placeholder="Doe"
                  onChange={(e) => setLastName(e.target.value)} />
              </fieldset>
            </>}
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
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p className="text-center">
            {isLoginForm ? "New User? " : "Already have an account? "}
            <button className="text-blue-500 underline cursor-pointer" onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError('');
            }}>
              {isLoginForm ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login