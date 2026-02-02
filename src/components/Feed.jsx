/* eslint-disable no-unused-vars */
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);


  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data.data));
    } catch(err) {
      console.log(err);
    }

  };

  useEffect(() => {
    if(feed) return;
    getFeed();
  }, []);

  if(!feed) return;

  if(feed.length <= 0) {
    return (
      <div className="flex justify-center mt-10">
        <div className="card bg-base-200 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">No more users in your feed</h2>
            <p>Check back later for more users to connect with!</p>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="flex justify-center mt-10">
      { feed &&<UserCard user={feed[0]}/>}
    </div>
  )
};

export default Feed;