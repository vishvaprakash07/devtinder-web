/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useRef, useState } from "react";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { firstName, lastName, photoUrl, gender, age, about, skills, _id } = user;

  // ---------------------------
  // Swipe state
  // ---------------------------
  const startX = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const MIN_SWIPE = 80;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------------------
  // Touch handlers
  // ---------------------------
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const delta = currentX - startX.current;

    setTranslateX(delta);
  };

  const onTouchEnd = () => {
    setIsDragging(false);

    if (Math.abs(translateX) > MIN_SWIPE) {
      const direction = translateX > 0 ? "right" : "left";
      const finalX = direction === "right" ? 1000 : -1000;

      setTranslateX(finalX);

      setTimeout(() => {
        if (direction === "right") {
          handleSendRequest("interested", _id);
        } else {
          handleSendRequest("ignored", _id);
        }
      }, 200);
    } else {
      setTranslateX(0);
    }
  };

  // ---------------------------
  // Background tint logic
  // ---------------------------

  // How strong the swipe is (0 → 1)
  const swipeStrength = Math.min(Math.abs(translateX) / 150, 1);

  const isRightSwipe = translateX > 0;
  const isLeftSwipe = translateX < 0;

  return (
    <div
      className="relative card bg-base-200 w-96 shadow-sm touch-pan-y select-none overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        transform: `translateX(${translateX}px) rotate(${translateX * 0.05}deg)`,
        transition: isDragging ? "none" : "transform 0.25s ease-out"
      }}
    >
      {/* ----------------------------------
           Background swipe tint layer
         ---------------------------------- */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: isRightSwipe
            ? `rgba(34,197,94,${0.25 * swipeStrength})`
            : isLeftSwipe
            ? `rgba(239,68,68,${0.25 * swipeStrength})`
            : "transparent",
          transition: isDragging ? "none" : "background-color 0.2s ease"
        }}
      />

      {/* Content */}
      <figure className="relative z-10">
        <img src={photoUrl} alt={firstName} />
      </figure>

      <div className="card-body relative z-10">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        <div>
          {gender && <span className="badge badge-info mr-2">{gender}</span>}
          {age && <span className="badge badge-secondary">{age}</span>}
        </div>

        {about && <p>{about}</p>}

        {Array.isArray(skills) && skills.length > 0 && (
          <p>{skills.join(", ")}</p>
        )}

        {/* Desktop only */}
        <div className="card-actions justify-between mt-4 hidden md:flex">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
