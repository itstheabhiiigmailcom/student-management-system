import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Course = () => {

    const [course, setCourse] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/course')
        .then(result => {
            if(result.data.Status) {
                setCourse(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
    
  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Course List</h3>
        </div>
        <Link to="/dashboard/add_course" className='btn btn-success'>Add Course</Link>
        <div className='mt-3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course Id</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        course.map(c => (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.id}</td>
                                <td><a href={`https://engineering.msruas.ac.in/programmes/btech-in-${c.name}`} target="_blank" rel="noopener noreferrer">{c.name} branch details</a></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Course