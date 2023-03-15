import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux/Action/Index';
import { getHomeAPI } from '../Services/StudentServices';


export default function StudentVerification({ children }) {

    const dispatch = useDispatch();
    const { storeStudentData } = bindActionCreators(actionCreators, dispatch);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('studentToken')) {
            navigate('/student',{replace:true})
        }
    }, [])
    useEffect(() => {
        if (localStorage.getItem('studentToken')) {
            const headers = {
                headers: {
                    Authorization: localStorage.getItem('studentToken')
                }
            }
            getHomeAPI(headers).then((response) => {
                storeStudentData(response.data.studentData)
            })
        }
    }, [])
    return children
}


