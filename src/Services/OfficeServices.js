import axios from "../axios";

export const availableTeachersAPI = (headers) => {
    return axios.get('/office/available-teachers', headers)
}
export const addBatchAPI = (data,headers) => {
    return axios.post('/office/add-batch', data, headers)
}
export const availableBatchAPI = (headers) => {
    return axios.get('/office/available-batches', headers)
}
export const addStudentAPI = (data,headers) => {
    return axios.post('/office/add-student', data, headers)
}
export const addTeacherAPI = (data,headers) => {
    return axios.post('/office/add-teacher', data, headers)
}
export const officeLoginAPI = (data) => {
    return axios.post('office/login', data)
}
export const handleGetStudentAPI = (id,headers) => {
    return axios.get(`/office/student/${id}`, headers)
}
export const blockStudentAPI = (id,headers) => {
    return axios.patch(`/office/block-student/${id}`,{}, headers)
}
export const unBlockStudentAPI = (id,headers) => {
    return axios.patch(`/office/unblock-student/${id}`,{}, headers)
}
export const editTeachertAPI = (id,formValues,headers) => {
    return axios.patch(`/office/edit-teacher/${id}`,formValues, headers)
}
export const getTeacherAPI = (id,headers) => {
    return axios.get(`/office/get-teacher/${id}`, headers)
}
export const blockTeacherAPI = (id,headers) => {
    return axios.patch(`/office/block-teacher/${id}`,{}, headers)
}
export const unBlockTeacherAPI = (id,headers) => {
    return axios.patch(`/office/unblock-teacher/${id}`,{}, headers)
}
export const getEditBatchAPI = (id,headers) => {
    return axios.get(`/office/get-edit-batch/${id}`, headers)
}
export const editBatchAPI = (id,data,headers) => {
    return axios.patch(`/office/edit-batch/${id}`,data, headers)
}
export const getBatches = (headers) => {
    return axios.get('/office/batches', headers)
}
export const getEachBatch = (id,headers) => {
    return axios.get(`/office/get-batch/${id}`, headers)
}
export const getstudentsAPI = (headers) => {
    return axios.get('/office/students', headers)
}
export const getTeachersAPI = (headers) => {
    return axios.get('/office/teachers', headers)
}

export const leaveApplcationsAPI = (headers) => {
    return axios.get('/office/leave-applications', headers)
}

export const leaveApproveAPI = (data,headers) => {
    return axios.patch('/office/leave-approve',data, headers)
}

export const leaveRejectAPI = (data,headers) => {
    return axios.patch('/office/leave-reject',data, headers)
}

export const getDashbordDataAPI = (headers) => {
    return axios.get('/office/dashboard', headers)
}

export const paymentDataAPI = (headers) => {
    return axios.get('/office/payments', headers)
}

