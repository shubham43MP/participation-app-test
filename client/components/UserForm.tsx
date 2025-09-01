"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { userApi } from "@/services/";

type FormData = {
  firstName: string;
  lastName: string;
  participationPercentage: number;
};

export const UserForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await userApi.createUser({
        ...data,
        participationPercentage: Number(data.participationPercentage),
      });
      reset();
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-start"
    >
      <div className="flex flex-col flex-1 w-full">
        <input
          type="text"
          placeholder="First name"
          {...register("firstName", { required: "First name is required" })}
          className={clsx(
            "p-3 rounded-md bg-white border-2 outline-none",
            errors.firstName ? "border-red-500" : "border-transparent"
          )}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1 font-semibold">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="flex flex-col flex-1 w-full">
        <input
          type="text"
          placeholder="Last name"
          {...register("lastName", { required: "Last name is required" })}
          className={clsx(
            "p-3 rounded-md bg-white border-2 outline-none",
            errors.lastName ? "border-red-500" : "border-transparent"
          )}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1 font-semibold">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div className="flex flex-col flex-1 w-full">
        <input
          type="number"
          placeholder="Participation"
          {...register("participationPercentage", {
            required: "Participation is required",
            min: { value: 1, message: "Min 1%" },
            max: { value: 100, message: "Max 100%" },
          })}
          className={clsx(
            "p-3 rounded-md bg-white border-2 outline-none",
            errors.participationPercentage
              ? "border-red-500"
              : "border-transparent"
          )}
        />
        {errors.participationPercentage && (
          <p className="text-red-500 text-sm mt-1 font-semibold">
            {errors.participationPercentage.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 border-2 border-white text-white font-semibold rounded-md bg-gradient-to-r from-cyan-500 to-cyan-300
 hover:from-cyan-300  hover:to-cyan-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1
    hover:shadow-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed self-center sm:self-auto focus:outline-none focus:ring-2
     focus:ring-cyan-300 focus:ring-offset-2"
      >
        {isSubmitting ? "Sending..." : "SEND"}
      </button>
    </form>
  );
};
