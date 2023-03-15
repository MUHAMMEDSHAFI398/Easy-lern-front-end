import React from 'react'
import AddStudentData from '../../Components/Teacher/AddStudentData/AddStudentData'
import EachStudent from '../../Components/Teacher/EachStudent/EachStudent'
import TeacherNav from '../../Components/Teacher/TeacherNav/TeacherNav'

function EachStudentView() {
  return (
    <div>
      <TeacherNav/>
      <EachStudent/>
      <AddStudentData/>
    </div>
  )
}

export default EachStudentView
