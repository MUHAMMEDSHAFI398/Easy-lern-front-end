import { Route, Routes } from 'react-router-dom';

import ViewTeacher from "../Pages/Office/viewTeacher";
import AddTeacher from "../Pages/Office/AddTeacher";
import Login from '../Pages/Office/Login';
import OfficeHome from "../Pages/Office/Home";
import EachTeacher from "../Pages/Office/EachTeacher";
import ViewStudent from "../Pages/Office/ViewStudent";
import AddStudent from "../Pages/Office/AddStudent";
import ViewBatch from "../Pages/Office/ViewBatch";
import AddBatach from "../Pages/Office/AddBatach";
import EachBatch from "../Pages/Office/EachBatch";
import EditBatch from "../Pages/Office/EditBatch";
import EachStudent from '../Pages/Office/EachStudent';
import TeacherLeaveApplications from '../Pages/Office/TeacherLeaveApplications';
import Payments from '../Pages/Office/Payments';

const OfficeRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<Login />} ></Route>

            <Route path="/home" element={<AdminVerification><OfficeHome /></AdminVerification>} ></Route>

            <Route path="/add-teacher" element={<AdminVerification><AddTeacher /></AdminVerification>} ></Route>

            <Route path="/teachers" element={<AdminVerification><ViewTeacher /></AdminVerification>} ></Route>

            <Route path="/each-teacher" element={<AdminVerification><EachTeacher /></AdminVerification>} ></Route>

            <Route path="/students" element={<AdminVerification><ViewStudent /></AdminVerification>} ></Route>

            <Route path="/add-student" element={<AdminVerification><AddStudent /></AdminVerification>} ></Route>

            <Route path="/batches" element={<AdminVerification><ViewBatch /></AdminVerification>} ></Route>

            <Route path="/add-batch" element={<AdminVerification><AddBatach /></AdminVerification>} ></Route>

            <Route path="/each-batch" element={<AdminVerification><EachBatch /></AdminVerification>} ></Route>

            <Route path="/edit-batch" element={<AdminVerification><EditBatch /></AdminVerification>} ></Route>

            <Route path="/each-student" element={<AdminVerification><EachStudent /></AdminVerification>} ></Route>

            <Route path="/leave-applications" element={<AdminVerification><TeacherLeaveApplications /></AdminVerification>} ></Route>

            <Route path="/payments" element={<AdminVerification><Payments/></AdminVerification>} ></Route>


        </Routes>
    )
};


export default OfficeRoutes;