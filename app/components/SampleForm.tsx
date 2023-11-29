"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Confetti from "react-confetti";

interface FormValues {
  username: string;
  email: string;
  password: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  age: number;
  dob: Date;
}

const SampleForm = () => {
  const [formData, setFormData] = useState({});

  // Initialize the form object to handle form data
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      age: 0,
      dob: new Date(),
    },
  });

  const {
    register,
    handleSubmit,
    formState,
    control,
    watch,
    getValues,
    setValue,
    reset,
  } = form;

  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  } = formState;

  console.log({
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  });

  // Watching the entire form
  const watchForm = watch();

  // Whenever the side-effect happen we subscribe the changes and store that changes into the state
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Reset form values after successfull submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form Errors", errors);
  };

  // Get the values of the form field
  // When no argument is passed then it return the entire form data
  // console.log(getValues());

  // Set the value of the form field programatically
  // setValue("username", "anything");

  return (
    <div className="text-center">
      <h1 className="mt-10 text-3xl font-bold">Sample Form</h1>
      <div className="bg-slate-800 my-10 mx-auto rounded-xl max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col max-w-sm mx-auto gap-4 p-3 pt-10"
        >
          {/* Username  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-start text-sm font-bold">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: { value: true, message: "Username is required" },
                maxLength: 20,
              })}
              className="rounded-lg text-black pl-2 bg-slate-400"
            />
            <p className="text-red-500 text-start text-xs">
              {errors.username?.message}
            </p>
          </div>

          {/* Email  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-start text-sm font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invlaid Email Format",
                },
              })}
              className="rounded-lg text-black pl-2 bg-slate-400"
            />
            <p className="text-red-500 text-start text-xs">
              {errors.email?.message}
            </p>
          </div>

          {/* Password  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-start text-sm font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
              className="rounded-lg text-black pl-2 bg-slate-400"
            />
            <p className="text-red-500 text-start text-xs">
              {errors.password?.message}
            </p>
          </div>

          {/* Twitter  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="twitter" className="text-start text-sm font-bold">
              Twitter
            </label>
            <input
              type="text"
              id="twitter"
              {...register("social.twitter")}
              className="rounded-lg text-black pl-2 bg-slate-400"
            />
          </div>

          {/* Facebook  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="facebook" className="text-start text-sm font-bold">
              Facebook
            </label>
            <input
              type="text"
              id="facebook"
              {...register("social.facebook")}
              className="rounded-lg text-black pl-2 bg-slate-400"
            />
          </div>

          {/* Primary phone number  */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="primary-phone"
              className="text-start text-sm font-bold"
            >
              Primary Phone Number
            </label>
            <input
              type="text"
              id="primary-phone"
              {...register("phoneNumbers.0")}
              className="rounded-lg text-black pl-2 bg-slate-400"
            />
          </div>

          {/* Secondary phone number  */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="secondary-phone"
              className="text-start text-sm font-bold"
            >
              Secondary Phone Number
            </label>
            <input
              type="text"
              id="secondary-phone"
              {...register("phoneNumbers.1")}
              className="rounded-lg text-black pl-2 bg-slate-400"
            />
          </div>

          {/* Age  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="age" className="text-start text-sm font-bold">
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age", {
                valueAsNumber: true,
                required: { value: true, message: "Age is required" },
              })}
              className="rounded-lg text-black pl-2 bg-slate-400"
            />
            <p className="text-red-500 text-start text-xs">
              {errors.age?.message}
            </p>
          </div>

          {/* Date of Birth  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="dob" className="text-start text-sm font-bold">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              {...register("dob", {
                disabled: watch("age") !== 0,
                valueAsDate: true,
                required: { value: true, message: "Date of birth is required" },
              })}
              className="rounded-lg text-black pl-2 bg-slate-400"
            />
            <p className="text-red-500 text-start text-xs">
              {errors.dob?.message}
            </p>
          </div>

          <button
            disabled={!isDirty || !isValid}
            type="submit"
            className="bg-slate-950 mx-auto p-3 rounded-lg disabled:opacity-50 hover:outline hover:outline-white"
          >
            {isSubmitting ? (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              "Submit"
            )}
          </button>

          {/* Confetti  */}
          {isSubmitSuccessful && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500}
            />
          )}

          <button type="button" className="bg-slate-950 mx-auto p-3 rounded-lg disabled:opacity-50 hover:outline hover:outline-white" onClick={() => reset()}>Reset</button>

        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
};

export default SampleForm;
