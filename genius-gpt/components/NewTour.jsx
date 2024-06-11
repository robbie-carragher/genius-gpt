// "use client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import TourInfo from "./TourInfo";
// import { getExistingTour, generateTourResponse, createNewTour } from "@/utlis/actions";
// import toast from "react-hot-toast"; // Ensure toast is imported
// import { useState } from "react";
// import Image from "next/image";

// const NewTour = () => {
//   const queryClient = useQueryClient();
//   const [tourImage, setTourImage] = useState(null);

//   const {
//     mutate,
//     isPending,
//     data: tourResponse,
//   } = useMutation({
//     mutationFn: async (destination) => {
//       const existingTour = await getExistingTour(destination);
      
//       if (existingTour) {
//         setTourImage(existingTour.image);
               
//         return { tour: existingTour, tokens: 0 };
//       }
//       const response = await generateTourResponse(destination);



//       if (response && response.tour) {
//         await createNewTour(response.tour);
//         queryClient.invalidateQueries({ queryKey: ['tours'] });
//         setTourImage(response.tour.image); // Set the fetched image URL
//         return response;
//       }
//       toast.error('No matching city found...');
//       return null;
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const destination = Object.fromEntries(formData.entries());
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
//         {tourImage ? (
//           <div>
//             <Image
//               src={tourImage}
//               width={300}
//               height={300}
//               className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
//               alt="Generated Tour Image"
//               priority
//             />
//           </div>
//         ) : null}
//         <div className="mt-16">{tourResponse ? <TourInfo tour={tourResponse.tour} /> : null}</div>
//       </div>
//     </>
//   );
// };

// export default NewTour;

"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TourInfo from "./TourInfo";
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
  fetchUserTokensById,
  subtractTokens,
} from "@/utlis/actions";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs"; // Ensure to import useAuth

const NewTour = () => {
  const { userId } = useAuth(); // Ensure you get the userId correctly
  const queryClient = useQueryClient();
  const [tourImage, setTourImage] = useState(null);

  const {
    mutate,
    isPending,
    data: tourResponse,
  } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);

      // If the tour already exists, set the image and return the tour
      if (existingTour) {
        setTourImage(existingTour.image);
        return { tour: existingTour, tokens: 0 };
      }

      // Fetch the current token balance for the user
      const currentTokens = await fetchUserTokensById(userId);

      // Check if the user has enough tokens
      if (currentTokens < 300) {
        toast.error('Token balance too low....');
        return null;
      }

      // Generate a new tour response
      const newTour = await generateTourResponse(destination);
      if (!newTour) {
        toast.error('No matching city found...');
        return null;
      }

      // Create the new tour in the database
      const repsonse = await createNewTour(newTour.tour);
      queryClient.invalidateQueries({ queryKey: ['tours'] });

      // Set the image URL for the new tour
      setTourImage(newTour.tour.image);

      // Subtract the tokens used for generating the tour and display the remaining token balance
      const newTokens = await subtractTokens(userId, newTour.tokens);
      toast.success(`${newTokens} tokens remaining...`);
      
      return newTour.tour;
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
        <div className="mt-16">{tourResponse ? <TourInfo tour={tourResponse} /> : null}</div>
      </div>
    </>
  );
};

export default NewTour;
