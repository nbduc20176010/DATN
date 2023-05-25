export interface iTeacher {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    salary: number;
}

export interface iStudent {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    belongToClass: string;
    tution: number;
    isPaid: boolean;
    age: number;
    sex: string;
}
