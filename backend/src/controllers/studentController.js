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

    let data = req.query
        let { studentname, Id } = data
        let filter = {
            isDeleted: false,
        };

        if (studentname) {
            let findByName = await studentModel.find({ studentname })
            if (!findByName) {
                return res.status(404).json({ status: false, message: "no students found for the given name" })
            }
            filter["studentname"] = studentname
        }

        if (Id) {
            let findById = await studentModel.find({ Id })
            if (!findById) {
                return res.status(404).json({ status: false, message: "no students found for the given id" })
            }
            filter["Id"] = Id
        }

        let findStudent = await studentModel.find(filter)

        if (!findStudent.length) {
            return res.status(404).json({ status: false, message: "No students with found with the given filter"})
        }
        else {
            return res.status(200).json({ status: true, data: findStudent })
        }

  } catch (error) {
    console.log(error.message);
  }
};

//=====================> update Student <===================
const updateStudent = async (req, res) => {
  try {
    let id = req.params.studentId;
        const data = req.body;
  
        const student = await studentModel.findOne({ _id: id, isDeleted: false })

        if (!student) {
            return res.status(404).send({ status: false, message: "No student exists with this student Id" })
        }


        if(data.studentname){
            student.studentname = data.studentname
        }

        
        if(data.subjects.english){
            student.subjects.english = data.subjects.english
        }
        if(data.subjects.mathematics){
            student.subjects.mathematics = data.subjects.mathematics
        }
        if(data.subjects.science){
            student.subjects.english = data.subjects.science
        }
        

        student.save()
        return res.status(201).send({ status: true, message: "details updated", data: student})
  } catch (error) {
    console.log(error.message);
  }
};
//=====================> Delete Student <===================
const deleteStudent = async (req, res) => {
  try {

    let studentId = req.params.studentId

        if (!studentId) {
            return res.status(400).json({ status: false, message: "studentId must be present in order to perform delete operation" })
        }

        let student = await studentModel.findOne({ _id: studentId, isDeleted: false })

        if (!student) {
            return res.status(404).json({ status: false, message: "No student exists with this student Id" })
        }

        await studentModel.findOneAndUpdate({ _id: studentId}, { $set: { isDeleted: true}})

        return res.status(200).json({ status: true, message: "Succesful" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createStudent, getStudent, updateStudent, deleteStudent };
