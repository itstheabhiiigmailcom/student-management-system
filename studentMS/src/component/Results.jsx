import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Results = () => {

    const [result, setResult] =  useState([])
    useEffect(()=> {
        axios.get('http://localhost:3000/auth/results')
        .then(result => {
            if(result.data.Status) {
                setResult(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_results/'+id)
      .then(result => {
          if(result.data.Status) {
              window.location.reload()
          } else {
              alert(result.data.Error)
          }
      })
    } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>student List</h3>
      </div>
      <Link to="/dashboard/add_results" className="btn btn-success">
        Add Results
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Student Id</th>
              <th>Earn Credit</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {result.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.id}</td>
                <td>{e.earn_credit}</td>
                <td>{e.marks}</td>
                <td>{e.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Results
