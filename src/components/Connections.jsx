import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center font-bold text-2xl mt-10">
        No connections found.
      </div>
    );
  }

  return (
    <div className="text-center my-10 px-3">
      <h1 className="font-bold text-2xl mb-6">Connections</h1>

      <div className="space-y-5 max-w-3xl mx-auto">
        {connections.map((connection) => {
          const {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
            _id,
          } = connection;

          return (
            <div
              key={_id}
              className="card bg-base-200 shadow-sm p-5 text-left"
            >
              <div className="flex flex-row gap-5 items-start">
                {/* Left - Profile image */}
                <img
                  alt="photo"
                  src={photoUrl}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shrink-0"
                />

                {/* Right - User info */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-xl wrap-break-word">
                    {firstName} {lastName}
                  </h2>

                  <h3 className="italic text-gray-600 mb-2 text-sm">
                    {gender}
                    {age !== undefined && age !== null && `, ${age}`}
                  </h3>

                  <p className="mb-2 text-sm wrap-break-word">
                    {about}
                  </p>

                  <h4 className="font-semibold text-sm">Skills:</h4>
                  <p className="text-sm wrap-break-word">
                    {Array.isArray(skills) ? skills.join(", ") : ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
