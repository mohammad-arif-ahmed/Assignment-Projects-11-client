import { Link } from "react-router-dom";

const ErrorPage = () => {

  return (

    <div className="min-h-screen flex flex-col justify-center items-center text-center">

      <h1 className="text-8xl font-bold">

        404

      </h1>

      <p className="text-2xl mt-4">

        Page Not Found

      </p>

      <Link
        to="/"
        className="btn btn-primary mt-6"
      >

        Back To Home

      </Link>

    </div>

  );

};

export default ErrorPage;