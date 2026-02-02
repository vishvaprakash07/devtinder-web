/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { firstName, lastName, photoUrl, gender, age, about, skills, _id } = user;


    const handleSendRequest = async (status, userId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId));
        } catch(err) {
            console.log(err);
        }
    };


    return (
        <div className="card bg-base-200 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt={firstName} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <div>
                    {gender && <span className="badge badge-info mr-2">{gender}</span>}
                    {age && <span className="badge badge-secondary">{age}</span>}
                </div>
                {about && <p>{about}</p>}
                {Array.isArray(skills) && skills.length > 0 && (
                    <p>{skills.join(", ")}</p>
                )}
                <div className="card-actions justify-between mt-4">
                    <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;