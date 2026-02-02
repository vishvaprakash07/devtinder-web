import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center font-bold text-2xl mt-10">
        No Requests found.
      </div>
    );
  }

  return (
    <div className="text-center my-10 px-3">
      <h1 className="font-bold text-2xl mb-6">Connection Requests</h1>

      <div className="space-y-5 max-w-3xl mx-auto">
        {requests.map((request) => {
          const {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            _id,
          } = request.fromUserId;

          return (
            <div
              key={_id}
              className="card bg-base-200 shadow-sm p-5 text-left"
            >
              <div className="flex flex-row gap-4 items-center">
                {/* Left - Profile image */}
                <img
                  alt="photo"
                  src={photoUrl}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shrink-0"
                />

                {/* Middle - User info */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-xl wrap-break-word">
                    {firstName} {lastName}
                  </h2>

                  <h3 className="italic text-gray-600 mb-2 text-sm">
                    {gender && `${gender}`}
                    {age !== undefined && age !== null && `, ${age}`}
                  </h3>

                  <p className="mb-0 text-sm wrap-break-word">
                    {about}
                  </p>
                </div>

                {/* Right - Actions */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
