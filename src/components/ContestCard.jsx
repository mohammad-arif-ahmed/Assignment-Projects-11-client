import { Link } from "react-router-dom";

const ContestCard = ({ contest }) => {

  return (

    <div className="card bg-base-100 shadow-xl">

      <figure className="h-56">

        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-full object-cover"
        />

      </figure>

      <div className="card-body">

        <h2 className="card-title">

          {contest.name}

        </h2>

        <p>

          {
            contest.description.slice(0, 80)
          }...

        </p>

        <div className="flex justify-between items-center">

          <span className="badge badge-primary">

            {contest.contestType}

          </span>

          <span className="font-semibold">

            {contest.participantsCount} Joined

          </span>

        </div>

        <div className="card-actions mt-4">

          <Link
            to={`/contest/${contest._id}`}
            className="btn btn-primary w-full"
          >

            View Details

          </Link>

        </div>

      </div>

    </div>

  );

};

export default ContestCard;