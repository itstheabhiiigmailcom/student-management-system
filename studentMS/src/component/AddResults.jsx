import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AddResults = () => {
    const [result, setResult] = useState({
        name: "",
        id: "",
        earn_credit: "",
        marks: "",
        grade: ""
      });
    //   const [course, setCourse] = useState([]);
      const navigate = useNavigate()

const handleSubmit = (e) => {

    e.preventDefault()
    axios.post('http://localhost:3000/auth/add_results', result)
    .then(result => {
        if(result.data.Status) {
          // console.log(result)
            navigate('/dashboard/results')
        } else {
            console.log(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }



  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Results</h3>
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
                setResult({ ...result, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Student Id
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Student Id"
              autoComplete="off"
              onChange={(e) =>
                setResult({ ...result, id: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Earn Credits
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter credits"
              onChange={(e) =>
                setResult({ ...result, earn_credit: e.target.value })
              }
            />
            <div/>
            
            <label for="inputMarks" className="form-label">
              Marks
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputMarks"
              placeholder="Enter Average Marks"
              autoComplete="off"
              onChange={(e) =>
                setResult({ ...result, marks: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputGrade" className="form-label">
              Grade
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputGrade"
              placeholder="Percent or Grade"
              autoComplete="off"
              onChange={(e) =>
                setResult({ ...result, grade: e.target.value })
              }
            />
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Results
            </button>
          </div>
        </form>
      </div>
    </div>
  )
            }

export default AddResults
