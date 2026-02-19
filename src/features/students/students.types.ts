export interface Student {
  admissionNo: string;
  name: string;
  admissionMonth: string;
  courseTakenDate: string;

  mobile: string;
  email: string;
  gender: string;
  city: string;
  course: string;
  stream: string;
  passoutYear: number;

  totalFee: number;
  totalPaid: number;
  pendingAmount: number;
  dueDate?: string;
  paymentMode: string;

  photo?: string | null;
}
