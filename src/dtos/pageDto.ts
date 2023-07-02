export interface iTeacher {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  image: {
    data: string;
  };
}

export interface iStudent {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  absent: number;
  midScore: number;
  finalScore: number;
  image: {
    data: string;
  };
}

export interface iClass {
  className: string;
  room: string;
  teacher?: iTeacher;
  numberOfStudents: number;
  maxStudents: number;
  students: iStudent[];
  schedule: any[];
  notes: string;
}

export interface iclass {
  class: string;
  room: string;
  shift: number;
}

export interface iSchedule {
  label: string;
  classes: iclass[];
}
