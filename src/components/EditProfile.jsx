import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl ?? "");
  const [gender, setGender] = useState(user?.gender ?? "");
  const [age, setAge] = useState(user?.age ?? "");
  const [about, setAbout] = useState(user?.about ?? "");
  const [skills, setSkills] = useState(
    Array.isArray(user?.skills) ? user.skills.join(", ") : ""
  );
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          age,
          about,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "An error occurred");
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span className="font-bold">Profile updated successfully</span>
          </div>
        </div>
      )}

      {/* Outer container: mobile = column, md+ = row */}
      <div className="flex flex-col justify-between md:flex-row gap-6 md:gap-10 my-5 mx-4 md:mx-10 lg:mx-20">
        {/* Edit card */}
        <div className="card bg-base-200 w-full md:w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL:</legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full"
                  placeholder="Photo URL"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender:</legend>
                <select
                  value={gender}
                  className="select select-bordered w-full"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </fieldset>


              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age:</legend>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered w-full"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">About:</legend>
                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full"
                  placeholder="About"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Skills:</legend>
                <input
                  type="text"
                  value={skills}
                  className="input input-bordered w-full"
                  placeholder="Skills"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>
            </div>

            {error && <p className="text-red-500 px-1 text-sm">{error}</p>}

            <div className="card-actions justify-center mt-1">
              <button className="btn btn-primary w-full md:w-auto" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Preview card: full width on mobile, side-by-side on md+ */}
        <div className="w-full md:w-auto mb-10">
          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl,
              gender,
              age,
              about,
              skills: skills
                ? skills.split(",").map((s) => s.trim()).filter(Boolean)
                : [],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
