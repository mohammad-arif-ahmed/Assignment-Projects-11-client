import { Link } from "react-router-dom";

const ContestCard = ({ contest }) => {

  const {
    _id,
    name,
    image,
    description,
    participantsCount,
    contestType,
    prizeMoney,
  } = contest;

  return (

    <div className="card bg-base-100 shadow-xl">

      <figure>

        <img
          src={image}
          alt={name}
          className="h-60 w-full object-cover"
        />

      </figure>

      <div className="card-body">

        <div className="flex justify-between items-center">

          <span className="badge badge-primary">

            {contestType}

          </span>

          <span className="font-semibold">

            ${prizeMoney}

          </span>

        </div>

        <h2 className="card-title">

          {name}

        </h2>

        <p>

          {description.slice(0, 80)}...

        </p>

        <div className="flex justify-between items-center mt-4">

          <p className="font-medium">

            {participantsCount} Joined

          </p>

          <Link
            to={`/contest/${_id}`}
            className="btn btn-primary btn-sm"
          >

            Details

          </Link>

        </div>

      </div>

    </div>

  );

};

export default ContestCard;