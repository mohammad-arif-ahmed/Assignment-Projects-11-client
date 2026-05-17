const Home = () => {

  return (

    <div className="py-10">

      {/* hero */}

      <div className="hero min-h-[70vh] rounded-3xl bg-base-300">

        <div className="hero-content text-center">

          <div className="max-w-2xl">

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">

              Discover Amazing Creative Contests

            </h1>

            <p className="py-6 text-lg">

              Join design, writing, gaming,
              and business contests from around the world.

            </p>

            <div className="flex flex-col md:flex-row gap-3 justify-center">

              <input
                type="text"
                placeholder="Search contest type..."
                className="input input-bordered w-full md:w-96"
              />

              <button className="btn btn-primary">

                Search

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Home;