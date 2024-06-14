
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
import { useAuth } from "@clerk/nextjs"; // Ensure to import useAuth

const NewTour = () => {
  const { userId } = useAuth(); // Ensure you get the userId correctly
  const queryClient = useQueryClient();


  const {
    mutate,
    isPending,
    data: tourResponse,
  } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);

      if (existingTour) return existingTour;

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

      const repsonse = await createNewTour(newTour.tour);
      queryClient.invalidateQueries({ queryKey: ['tours'] });
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
        <div className="mt-16">{tourResponse ? <TourInfo tour={tourResponse} /> : null}</div>
      </div>
    </>
  );
};

export default NewTour;
