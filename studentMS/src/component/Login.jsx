import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    
    const [values, setvalues] = useState({
        name:'',
        email:'',
        password:''
    })
    const [error,setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event)=> {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin',values)
        .then(result => {
            if(result.data.loginStatus){                    // if creadentials are right then move to the dashboard otherwise show error
                navigate('/dashboard')
            }else{
                setError(result.data.Error)                     // taking that error from AdminRoute.js's result
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginform text-light'>
            <div className='text-warning'>
                {error &&  error}
            </div>
            <h2 >Login Page</h2>
            <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className='mb-3'>
                    <label htmlFor="name"><strong>Name::</strong></label>
                    <input type="text" name='name' autoComplete='off' placeholder='Enter Email' 
                    onChange={(e) => setvalues({...values, name : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email' 
                    onChange={(e) => setvalues({...values, email : e.target.value})} className='form-control rounded-0'/>
                </div>
                {/* Password */}
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter password' 
                    onChange={(e) => setvalues({...values, password : e.target.value})} className='form-control rounded-0'/>
                </div>
                {/* button */}
                <button className='btn btn-success w-100 rounded-0 mb-2'>Login</button>
                {/* check-box */}
                <div className="mb-1">
                    <input type="checkbox" name='tick' id='tick' className='me-2'/>
                    <label htmlFor="password">You are agree with terms and conditions</label>
                </div>
            </form>
        </div>
</div>
  )
}

export default Login
