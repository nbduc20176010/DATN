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
    className: string;
    room: string;
}

export interface iSchedule {
    label: string;
    class: iclass[];
}
