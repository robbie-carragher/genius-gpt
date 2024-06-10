// "use client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import TourInfo from "./TourInfo";
// import {
//   getExistingTour,
//   generateTourResponse,
//   createNewTour,
// } from "@/utlis/actions";
// import toast from "react-hot-toast"; // Ensure toast is imported

// const NewTour = () => {
//   const queryClient = useQueryClient()
//   const {
//     mutate,
//     isPending,
//     data: tour,
//   } = useMutation({
//     mutationFn: async (destination) => {
//       const existingTour = await getExistingTour(destination);
//       if (existingTour) return existingTour;
//       const newTour = await generateTourResponse(destination);
//       if (newTour) {
//         await createNewTour(newTour);
//         queryClient.invalidateQueries({ queryKey: ['tours'] });
//         return newTour;
//       }
//       toast.error('No matching city found...');
//       return null;
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const destination = Object.fromEntries(formData.entries());
//     console.log(destination);
//     mutate(destination); // Trigger the mutation
//   };

//   if (isPending) {
//     return <span className="loading loading-lg"></span>;
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit} action="" className="max-w-2xl">
//         <h2 className="mb-4 text-3xl">Select your Dream Destination</h2>
//         <div className="join w-full">
//           <input
//             type="text"
//             className="input input-bordered join-item w-full"
//             placeholder="city"
//             name="city"
//             required
//           />
//           <input
//             type="text"
//             className="input input-bordered join-item w-full"
//             placeholder="country"
//             name="country"
//             required
//           />
//           <button
//             className="btn btn-primary join-item"
//             type="submit"
//             disabled={isPending}
//           >
//             {isPending ? "please wait..." : "generate tour"}
//           </button>
//         </div>
//       </form>
//       <div className="mt-16">
//         <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
//       </div>
//     </>
//   );
// };

// export default NewTour;


"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TourInfo from "./TourInfo";
import { getExistingTour, generateTourResponse, createNewTour } from "@/utlis/actions";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";

const NewTour = () => {
  const queryClient = useQueryClient();
  const [tourImage, setTourImage] = useState(null);

  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        await createNewTour(newTour);
        queryClient.invalidateQueries({ queryKey: ['tours'] });
        setTourImage(newTour.image); // Set the fetched image URL
        return newTour;
      }
      toast.error('No matching city found...');
      return null;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination); // Trigger the mutation
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} action="" className="max-w-2xl">
        <h2 className="mb-4 text-3xl">Select your Dream Destination</h2>
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
          <button
            className="btn btn-primary join-item"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "please wait..." : "generate tour"}
          </button>
        </div>
      </form>
      <div className="mt-16">
        {tourImage ? (
          <div>
            <Image
              src={tourImage}
              width={300}
              height={300}
              className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
              alt="Generated Tour Image"
              priority
            />
          </div>
        ) : null}
        <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
      </div>
    </>
  );
};

export default NewTour;
