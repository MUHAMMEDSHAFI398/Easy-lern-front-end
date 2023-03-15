import { combineReducers } from "redux";
import studentReducer from "./StudentReducer";
import teacherReducer from './TeacherReducer';


const reducers = combineReducers({
    teacherData:teacherReducer,
    studentData:studentReducer 
});

export default reducers;