import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const student = () => {
  const [student, setStudent] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/student')
        .then(result => {
            if(result.data.Status) {
                setStudent(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
  // const handleDelete = (id) => {
  //   axios.delete('http://localhost:3000/auth/delete_student/'+id)
  //   .then(result => {
  //       if(result.data.Status) {
  //           window.location.reload()
  //       } else {
  //           alert(result.data.Error)
  //       }
  //   })
  // } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>student List</h3>
      </div>
      <Link to="/dashboard/add_student" className="btn btn-success">
        Add student
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Course Id</th>
              <th>Fees</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {student.map((e) => (
              <tr>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="student_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.course_id}</td>
                <td>{e.fees}</td>
                <td>{e.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default student;
