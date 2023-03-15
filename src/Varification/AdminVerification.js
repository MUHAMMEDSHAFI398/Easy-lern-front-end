import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminVerification({ children }) {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('officeToken')) {
            navigate('/office',{replace:true})
        }
    }, [])
    return children
}
