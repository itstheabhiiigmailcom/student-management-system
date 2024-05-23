import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './component/Login.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './component/Dashboard.jsx'
import Student from './component/Student.jsx'
import AddStudent from './component/AddStudent.jsx'
import Course from './component/Course.jsx'
import AddCourse from './component/AddCourse.jsx'
import Home from './component/Home.jsx'
import Results from './component/Results.jsx'
import AddResults from './component/AddResults.jsx'

// import Fees from './component/Fees.jsx'


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/adminlogin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
        <Route path=''  element={<Home/>}/></Route>
        <Route path='/dashboard/student'  element={<Student/>}/>
        <Route path='/dashboard/course'  element={<Course/>}/>
        <Route path='/dashboard/results'  element={<Results/>}/>
        <Route path='/dashboard/add_results'  element={<AddResults/>}/>
        <Route path='/dashboard/add_course' element={<AddCourse/>}></Route>
        <Route path='/dashboard/add_student' element={<AddStudent/>}></Route>
 
      </Routes>
    </BrowserRouter>
  )
}

export default App
