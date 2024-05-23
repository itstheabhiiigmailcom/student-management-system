import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    fees: "",
    result: "",
    image: "",
    course_id: ""
  });
  const [course, setCourse] = useState([]);
  const navigate = useNavigate()

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/auth/course")
  //     .then((result) => {
  //       if (result.data.Status) {
  //         setCourse(result.data.Result);
  //       } else {
  //         console.log(result.data.Error);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', student.name);
    formData.append('email', student.email);
    formData.append('password', student.password);
    formData.append('address', student.address);
    formData.append('result', student.result);
    formData.append('fees', student.fees);
    formData.append('image', student.image);
    formData.append('course_id', student.course_id);

    axios.post('http://localhost:3000/auth/add_student', formData)
    .then(result => {
        if(result.data.Status) {
          // console.log(result)
            navigate('/dashboard/student')
        } else {
            console.log(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Student</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setStudent({ ...student, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
            />
            <div/>

            <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="address"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, address: e.target.value })
              }
            />
          </div>
            
            <label for="inputFees" className="form-label">
              Fees
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputFees"
              placeholder="Enter Fees"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, fees: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputResult" className="form-label">
              Result
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputResult"
              placeholder="Percent or Grade"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, result: e.target.value })
              }
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setStudent({...student, image: e.target.files[0]})}
            />
          </div>
          <div className="col-12">
            <label for="courseid" className="form-label">
              Course Id
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="courseid"
              placeholder="Enter courseId"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, course_id: e.target.value })
              }
            />
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
