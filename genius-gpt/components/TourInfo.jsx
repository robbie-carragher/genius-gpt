// import React from 'react'

// const TourInfo = ({tour}) => {
//     console.log(tour)
//   return (
//     <div>{tour}</div>
//   )
// }

// export default TourInfo

import React from 'react';

const TourInfo = ({ tour }) => {
  if (!tour) {
    return null;
  }

  return (
    <div className="tour-info">
      <h2 className="text-2xl font-bold">{tour.title}</h2>
      <p>{tour.description}</p>
      <h3 className="text-xl font-semibold mt-4">Stops:</h3>
      <ul className="list-disc ml-5">
        {tour.stops.map((stop, index) => (
          <li key={index}>{stop}</li>
        ))}
      </ul>
    </div>
  );
};

export default TourInfo;
