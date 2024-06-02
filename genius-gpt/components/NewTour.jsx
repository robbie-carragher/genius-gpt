'use client';

import TourInfo from "./TourInfo";

const NewTour = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDat = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formDat.entries())
    console.log(destination);
    // Add your submission logic here
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="" className="max-w-2xl">
        <h2 className="mb-4">Select your Dream Destination</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="city"
            name="city"
            required
          />
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="country"
            name="country"
            required
          />
          <button className="btn btn-primary join-item" type="submit">
            generate tour
          </button>
        </div>
      </form>
      <div className="mt-16">
        <TourInfo />
      </div>
    </>
  );
};

export default NewTour;
