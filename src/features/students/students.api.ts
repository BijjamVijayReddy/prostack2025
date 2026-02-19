import students from "@/data/students.json";
import { Student } from "./students.types";

export async function fetchStudents(): Promise<Student[]> {
  // simulate backend delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return students as Student[];
}
