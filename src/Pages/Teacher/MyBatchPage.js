import React from 'react'
import AddWorkingDays from '../../Components/Teacher/AddWorkingDays/AddWorkingDays'
import MyBatach from '../../Components/Teacher/Mybatch/MyBatach'
import TeacherNav from '../../Components/Teacher/TeacherNav/TeacherNav'

function MyBatchPage() {
    return (
        <div >
            <TeacherNav />
            <MyBatach />
            <AddWorkingDays/>
            
        </div>
    )
}

export default MyBatchPage
