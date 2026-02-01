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
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.log(err);
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
            console.log(res.data.message);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length === 0) {
        return (
            <div className="flex justify-center font-bold text-2xl mt-10">No Requests found.</div>
        );
    }

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-2xl">Connection Requests</h1>
            {requests.map((request) => {
                const { firstName, lastName, photoUrl, age, gender, about, _id } = request.fromUserId;
                return (
                    <div
                        key={_id}
                        className="card bg-base-200 max-h-40 max-w-2xl mx-auto my-5 shadow-sm p-5"
                    >
                        <div className="flex gap-6 items-center">

                            {/* Left - Profile image */}
                            <img
                                alt="photo"
                                src={photoUrl}
                                className="w-25 h-25 rounded-full object-cover flex-shrink-0"
                            />

                            {/* Right - User info */}
                            <div className="flex-1">
                                <h2 className="font-bold text-xl">
                                    {firstName} {lastName}
                                </h2>

                                <h3 className="italic text-gray-600 mb-2">{gender && `${gender},`} {age && `${age}`}</h3>

                                <p className="mb-2 text-sm">{about}</p>
                            </div>
                            <div className="items-center">
                                <button className="btn btn-sm btn-primary mr-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                                <button className="btn btn-sm btn-secondary" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            </div>
                        </div>
                    </div>
                );

            })}
        </div>
    );
};

export default Requests;