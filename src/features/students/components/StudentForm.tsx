"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentSchema } from "../student.schema";
import { StudentPhotoUpload } from "./StudentPhotoUpload";

interface StudentFormProps {
  onSubmit: (data: any) => void;
}

export function StudentForm({ onSubmit }: StudentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      photo: null,
    },
  });

  const photo = watch("photo") ?? null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 sm:grid-cols-2"
    >
      {/* PHOTO UPLOAD */}
      <div className="sm:col-span-2">
        <StudentPhotoUpload
          photo={photo}
          setPhoto={(val) => setValue("photo", val)}
        />
      </div>

      {/* ADMISSION NO */}
      <div>
        <input
          {...register("admissionNo")}
          placeholder="Admission Number"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.admissionNo?.message}</p>
      </div>

      {/* FULL NAME */}
      <div>
        <input
          {...register("name")}
          placeholder="Full Name"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.name?.message}</p>
      </div>

      {/* MOBILE */}
      <div>
        <input
          {...register("mobile")}
          placeholder="Mobile Number"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.mobile?.message}</p>
      </div>

      {/* EMAIL */}
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.email?.message}</p>
      </div>

      {/* GENDER */}
      <div>
        <select
          {...register("gender")}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <p className="text-xs text-red-500">{errors.gender?.message}</p>
      </div>

      {/* CITY */}
      <div>
        <input
          {...register("city")}
          placeholder="City"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.city?.message}</p>
      </div>

      {/* COURSE */}
      <div>
        <input
          {...register("course")}
          placeholder="Course"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.course?.message}</p>
      </div>

      {/* STREAM */}
      <div>
        <input
          {...register("stream")}
          placeholder="Stream"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.stream?.message}</p>
      </div>

      {/* ADMISSION DATE */}
      <div>
        <input
          type="date"
          {...register("courseTakenDate")}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">
          {errors.courseTakenDate?.message}
        </p>
      </div>

      {/* ADMISSION MONTH */}
      <div>
        <input
          {...register("admissionMonth")}
          placeholder="YYYY-MM"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.admissionMonth?.message}</p>
      </div>

      {/* TOTAL FEE */}
      <div>
        <input
          type="number"
          {...register("totalFee")}
          placeholder="Total Fee"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.totalFee?.message}</p>
      </div>

      {/* TOTAL PAID */}
      <div>
        <input
          type="number"
          {...register("totalPaid")}
          placeholder="Total Paid"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.totalPaid?.message}</p>
      </div>

      {/* PENDING */}
      <div>
        <input
          type="number"
          {...register("pendingAmount")}
          placeholder="Pending Amount"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
        <p className="text-xs text-red-500">{errors.pendingAmount?.message}</p>
      </div>

      {/* SUBMIT */}
      <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
        {/* Cancel */}
        <button
          type="button"
        //   onClick={oncancel}
          className="w-full rounded-md border bg-orange-400 border-gray-300 py-2 text-sm text-white hover:bg-orange-300 cursor-pointer transition"
        >
          Cancel
        </button>

        {/* Save */}
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-[#0B1220] py-2 text-sm text-white hover:bg-[#1A2030] transition"
        >
          Save Student
        </button>
      </div>
    </form>
  );
}
