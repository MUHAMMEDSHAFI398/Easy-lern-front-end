import { Route, Routes } from 'react-router-dom';
import HomeTeacher from '../Pages/Teacher/HomeTeacher';
import LoginTeacher from '../Pages/Teacher/LoginTeacher';
import MyStudent from '../Pages/Teacher/MyStudent';
import UpdateProfile from '../Pages/Teacher/UpdateProfile';
import EachStudentView from '../Pages/Teacher/EachStudentView';
import MyBatchPage from '../Pages/Teacher/MyBatchPage';
import LeaveApplicaton from '../Pages/Teacher/LeaveApplicaton';
import StudentDataPage from '../Pages/Teacher/StudentDataPage';
import TeacherVarification from '../Varification/TeacherVarification';
import StudentLeaveApplications from '../Pages/Teacher/StudentLeaveApplications';


const TeacherRoute = () => (

    <Routes>

        <Route path="/" element={<LoginTeacher />} ></Route>

        <Route path="/home" element={<TeacherVarification><HomeTeacher /></TeacherVarification>} ></Route>

        <Route path="/update-profile" element={<TeacherVarification><UpdateProfile /></TeacherVarification>} ></Route>

        <Route path="/my-students" element={<TeacherVarification><MyStudent /></TeacherVarification>} ></Route>

        <Route path="/each-student" element={<TeacherVarification><EachStudentView /></TeacherVarification>} ></Route>

        <Route path="/my-batch" element={<TeacherVarification><MyBatchPage /></TeacherVarification>} ></Route>

        <Route path="/leave-applications" element={<TeacherVarification><LeaveApplicaton /></TeacherVarification>} ></Route>

        <Route path="/student-data" element={<TeacherVarification><StudentDataPage /></TeacherVarification>} ></Route>

        <Route path="/student-leaves" element={<TeacherVarification><StudentLeaveApplications /></TeacherVarification>} ></Route>



    </Routes>
);

export default TeacherRoute;