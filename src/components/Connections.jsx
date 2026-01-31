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
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0) {
        return (
            <div className="flex justify-center font-bold text-2xl mt-10">No connections found.</div>
        );
    }

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-2xl">Connections</h1>
            {connections.map((connection) => {
                const { firstName, lastName, photoUrl, age, gender, about, skills, _id } = connection;
                return (
                    <div
                        key={_id}
                        className="card bg-base-200 max-h-40 max-w-2xl mx-auto my-5 shadow-sm p-5"
                    >
                        <div className="flex gap-6 items-start">

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

                                <h3 className="italic text-gray-600 mb-2">{gender}, {age}</h3>

                                <p className="mb-2 text-sm">{about}</p>

                                <h4 className="font-semibold text-sm">Skills:</h4>
                                <p className="text-sm">{skills.join(", ")}</p>
                            </div>
                        </div>
                    </div>
                );

            })}
        </div>
    );
};

export default Connections