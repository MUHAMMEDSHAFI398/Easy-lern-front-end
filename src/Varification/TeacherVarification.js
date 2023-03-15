import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux/Action/Index';
import { getHomeAPI } from '../Services/TeacherServices'


export default function TeacherVarification({ children }) {

    const dispatch = useDispatch();
    const { storeTeacherData } = bindActionCreators(actionCreators, dispatch);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('teacherToken')) {
            navigate('/teacher',{replace:true})
        }
    }, [])
    useEffect(() => {
        if (localStorage.getItem('teacherToken')) {
            const headers = {
                headers: {
                    Authorization: localStorage.getItem('teacherToken')
                }
            }
            getHomeAPI(headers).then((response) => {
                storeTeacherData(response.data.teacherData)
            })
        }
    }, [])
    return children


}





