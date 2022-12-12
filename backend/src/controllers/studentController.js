const studentModel = require("../models/studentModel");
const userModel = require("../models/userModel");

//=====================> Create Student <===================

const createStudent = async (req, res) => {
  try {
    let data = req.body;
    let { studentname, email, Id, phone, totals, subjects, username } = data;

    //=========> studentname <============
    if (!studentname) {
      return res.status(400).json("Please enter studentname");
    }

    //=========> email <============
    if (!email) {
      return res.status(400).json("Please enter email");
    }
    const dublicateEmail = await studentModel.findOne({ email });

    if (dublicateEmail) {
      return res.status(400).json(" Email Already Exists");
    }

    //=========> Id <============
    if (!Id) {
      return res.status(400).json("Please enter Id number");
    }
    const dublicateId = await studentModel.findOne({ Id });

    if (dublicateId) {
      return res.status(400).json(" Id Number Already Exists");
    }

    //=========> Phone <============
    if (!phone) {
      return res.status(400).json("Please enter phone number");
    }
    const dublicatePhone = await studentModel.findOne({ phone });
    if (dublicatePhone) {
      return res.status(400).json(" Phone Number Already Exists");
    }

    //=========> subjects <============

    if (!subjects) {
      return res.status(400).json("Please enter Subjects");
    }

    let marksExists = await studentModel.findOne({ studentname, Id });
    if (marksExists) {
      if (subjects.english) {
        data.subjects.english += subjects.english;
      }

      if (subjects.mathematics) {
        data.subjects.mathematics += subjects.mathematics;
      }

      if (subjects.science) {
        data.subjects.science += subjects.science;
      }
    }

    if (subjects.english) {
      data.subjects.english = subjects.english;
      //  totals+=data.subjects.english
    } else {
      data.subjects.english = 0;
    }
    if (subjects.mathematics) {
      data.subjects.mathematics = subjects.mathematics;
    } else {
      data.subjects.mathematics = 0;
    }
    if (subjects.science) {
      data.subjects.science = subjects.science;
    } else {
      data.subjects.science = 0;
    }
    totals =
      data.subjects.english + data.subjects.science + data.subjects.mathematics;

    //=========> Admin name <============
    let Admin = await userModel.findOne({ username });
    if (!Admin) {
      return res.status(400).json("User not found");
    }

    let userId = Admin._id.toString();
    newData = { studentname, email, Id, phone, subjects, totals, userId };

    const saveData = await studentModel.create(newData);
    return res.status(201).json(saveData);
  } catch (error) {
    console.log(error.message);
  }
};

//=====================> get Student <===================

const getStudent = async (req, res) => {
  try {
    let { studentname, Id, subjects } = req.query;
    let filter = { isDeleted: false };

    if (studentname) {
      filter.studentname = { $regex: studentname, $options: "i" };
    }

    if (Id) {
      filter.Id = { $regex: Id, $options: "i" };
    }
    if (subjects.english) {
      filter.subjects.english = { $regex: english, $options: "i" };
    }
    if (subjects.mathematics) {
      filter.subjects.mathematics = { $regex: mathematics, $options: "i" };
    }
    if (subjects.science) {
      filter.subjects.science = { $regex: science, $options: "i" };
    }

    let students = await studentModel.find(filter);

    if (students.length == 0) {
      return res.status(404).json("No students found");
    }

    return res.status(200).json({ students });
  } catch (error) {
    console.log(error.message);
  }
};

//=====================> update Student <===================
const updateStudent = async (req, res) => {
  try {
    let data = req.body;
    let { studentname, phone, subjects } = data;

    let student = await studentModel.findOne({
      studentname,
      phone,
      subjects,
      userId: req.userId,
      isDeleted: false,
    });
    if (!student) return res.status(404).json("Student not found");

    student.studentname = studentname;
    student.save();

    student.phone = phone;
    student.save();

    student.subjects.english = subjects.english;
    student.save();

    student.subjects.mathematics = subjects.mathematics;
    student.save();

    student.subjects.science = subjects.science;
    student.save();

    return res.status(200).json(student);
  } catch (error) {
    console.log(error.message);
  }
};
//=====================> Delete Student <===================
const deleteStudent = async (req, res) => {
  try {
    let data = req.body;
    let { studentname, email, Id, phone, subjects, totals } = data;

    let student = await studentModel.findOne({
      studentname,
      subjects,
      userId: req.userId,
      isDeleted: false,
    });

    if (student) {
      student.isDeleted = true;
      student.save();
      return res.status(200).json("Student deleted");
    } else {
      return res.status(404).json("Student not found");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createStudent, getStudent, updateStudent, deleteStudent };
