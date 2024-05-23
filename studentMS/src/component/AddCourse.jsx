import axois from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCourse = () => {

  const [course, setCourse] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axois.post('http://localhost:3000/auth/add_course',{course})
    .then(result=> {
      if(result.data.Status){
          navigate("/dashboard/course")
      }else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
    <div className='p-3 rounded w-25 border'>
        <h2 >Add Course</h2>
        <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className='mb-3'>
                <label htmlFor="course"><strong>Course:</strong></label>
                <input type="text" name='Course' autoComplete='off' placeholder='Enter Course' 
                onChange={(e) => setCourse(e.target.value)} className='form-control rounded-0'/>
            </div>
            
            {/* button */}
            <button className='btn btn-success w-100 rounded-0 mb-2'>Add Course</button>
            {/* check-box */}
            
        </form>
    </div>
</div>
  )
}

export default AddCourse
