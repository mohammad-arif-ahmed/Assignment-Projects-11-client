import { useState } from "react";

import { useForm } from "react-hook-form";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import useAuth from "../../hooks/useAuth";

const AddContest = () => {

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const [deadline, setDeadline] =
    useState(new Date());

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {

    const contestData = {

      ...data,

      price: parseFloat(data.price),

      prizeMoney: parseFloat(
        data.prizeMoney
      ),

      participantsCount: 0,

      creatorEmail: user?.email,

      deadline,

      status: "pending",

      createdAt: new Date(),

    };

    try {

      const res = await axiosSecure.post(
        "/contests",
        contestData
      );

      if (res.data.insertedId) {

        Swal.fire({
          icon: "success",
          title: "Contest Added",
          timer: 1500,
          showConfirmButton: false,
        });

        reset();

      }

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: error.message,
      });

    }

  };

  return (

    <div className="max-w-4xl mx-auto">

      <h2 className="text-4xl font-bold mb-8">

        Add New Contest

      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        <input
          {...register("name")}
          placeholder="Contest Name"
          className="input input-bordered w-full"
          required
        />

        <input
          {...register("image")}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        <textarea
          {...register("description")}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        <input
          {...register("taskInstruction")}
          placeholder="Task Instruction"
          className="input input-bordered w-full"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            type="number"
            {...register("price")}
            placeholder="Registration Price"
            className="input input-bordered w-full"
            required
          />

          <input
            type="number"
            {...register("prizeMoney")}
            placeholder="Prize Money"
            className="input input-bordered w-full"
            required
          />

        </div>

        <select
          {...register("contestType")}
          className="select select-bordered w-full"
        >

          <option>
            Web Development
          </option>

          <option>
            Cyber Security
          </option>

          <option>
            Health & Fitness
          </option>

          <option>
            Education
          </option>

          <option>
            Music
          </option>

        </select>

        <div>

          <p className="mb-2 font-semibold">

            Select Deadline

          </p>

          <DatePicker
            selected={deadline}
            onChange={date =>
              setDeadline(date)
            }
            className="input input-bordered w-full"
          />

        </div>

        <button className="btn btn-primary w-full">

          Add Contest

        </button>

      </form>

    </div>

  );

};

export default AddContest;