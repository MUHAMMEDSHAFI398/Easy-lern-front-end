import axios from "../axios";

export const getHomeAPI = (headers) => {
  return axios.get('/student/home', headers)
}

export const getMarkDetailsAPI = (headers) => {
  return axios.get('/student/mark-data', headers)
}

export const attenDanceDetailsAPI = (headers) => {
  return axios.get('/student/attendance-data', headers)
}

export const postLetterAPI = (data,headers) => {
  return axios.post('/student/letter',data, headers)
}

export const leaveHistoryAPI = (headers) => {
  return axios.get('/student/leave-history', headers)
}

export const getFeeDetailsAPI = (batchId,headers) => {
  return axios.get(`/student/get-fee/${batchId}`, headers)
}

export const feePaymentAPI = (batchId,data,headers) => {
  return axios.post(`/student/fee-payment/${batchId}`,data, headers)
}

export const  verifyPaymentAPI = (data,headers) => {
  return axios.post('/student/verify-payment',data, headers)
}

export const getpaymentDetailsAPI = (headers) => {
  return axios.get('/student/payment-details', headers)
}