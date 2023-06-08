const Columns = class Columns {
    static get TEACHER_COLUMNS() {
        return [
            {
                title: "Name",
                dataIndex: "fullName",
                key: "fullName",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
            },
            {
                title: "Phone number",
                dataIndex: "phoneNumber",
                key: "phoneNumber",
            },
            {
                title: "Age",
                dataIndex: "age",
                key: "age",
            },
        ];
    }
    static get STUDENT_COLUMNS() {
        return [
            {
                title: "Name",
                dataIndex: "fullName",
                key: "fullName",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
            },
            {
                title: "Age",
                dataIndex: "age",
                key: "age",
            },
            {
                title: "Class",
                dataIndex: "belongToClass",
                key: "belongToClass",
            },
        ];
    }
    static get CLASS_COLUMNS() {
        return [
            {
                title: "Class",
                dataIndex: "className",
                key: "className",
            },
            {
                title: "Room",
                dataIndex: "room",
                key: "room",
            },
            {
                title: "Total",
                dataIndex: "numberOfStudents",
                key: "numberOfStudents",
            },
            {
                title: "Max",
                dataIndex: "maxStudents",
                key: "maxStudents",
            },
        ];
    }
};

export default Columns;
