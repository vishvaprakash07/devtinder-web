const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, gender, age, about, skills } = user;

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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;