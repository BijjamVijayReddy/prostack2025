"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchStudents } from "./students.api";
import { Student } from "./students.types";
import { StudentsFilters } from "./components/StudentsFilters";
import { StudentsTable } from "./components/StudentsTable";
import { Button } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { StudentFormModal } from "./components/StudentFormModal";

export function StudentsClient() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchStudents().then((res) => {
      setStudents(res);
      setLoading(false);
    });
  }, []);

  // 🔥 FILTER LOGIC
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const [year, month] = student.admissionMonth.split("-");

      const matchMonth = selectedMonth ? month === selectedMonth : true;

      const matchYear = selectedYear ? year === selectedYear : true;

      return matchMonth && matchYear;
    });
  }, [students, selectedMonth, selectedYear]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <StudentsFilters
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <Button
          className="flex items-center gap-2 bg-[#0B1220] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1A2030] transition cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <PlusCircleIcon className="h-4 w-4" />
          New Student
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading students...</p>
      ) : (
        <StudentsTable data={filteredStudents} />
      )}
      <StudentFormModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
