import React, { useEffect, useState } from 'react';
import { feePaymentAPI, getFeeDetailsAPI, getpaymentDetailsAPI, verifyPaymentAPI } from '../../../Services/StudentServices';
import { useSelector } from 'react-redux';
// import Razorpay from 'react-razorpay';
import useRazorpay from "react-razorpay";
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
import { razropaykeyId } from '../../../Constants/Constants';





import './Payment.css'


function Payment() {

    const batchId = useSelector(state => state.studentData.studentData.batch)
    const [feeDetails, setFeeDetails] = useState({ totalFee: "", pendingFee: "", installmentAmount: "" })
    const [selectedOption, setSelectedOption] = useState('One time settlement');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState([])
    const [feeClosed, setFeeClosed] = useState(false)


    const Razorpay = useRazorpay();
    const navigate = useNavigate()


    useEffect(() => {
        if (batchId !== undefined) {
            const headers = {
                headers: {
                    Authorization: localStorage.getItem('studentToken')
                }
            };

            getFeeDetailsAPI(batchId, headers)
                .then(response => {
                    if (response.status === 200) {
                        if(response.data.pendingFee < 1){
                            setFeeClosed(true)
                        }
                        setFeeDetails(response.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [batchId,isModalOpen])
    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem('studentToken')
            }
        };
        getpaymentDetailsAPI(headers).then((response) => {
            setPaymentDetails(response.data.paymentDetails)
        })
    }, [isModalOpen])

   

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handlePayment = () => {
        let option;
        if (selectedOption === "One time settlement")
            option = "One time"
        else
            option = "Installlment"
        const headers = {
            headers: {
                Authorization: localStorage.getItem('studentToken')
            }
        }
        feePaymentAPI(batchId, { option }, headers).then((res) => {
            const options = {
                key: razropaykeyId,
                amount: res.data.order.amount,
                currency: "INR",
                name: "Easy learn",
                description: "Test Transaction",
                image: "/images/logo-project.png",
                order_id: res.data.order.id,
                handler: function (response) {

                    verifyPayment(response, res.data);
                },
                prefill: {
                    name: "Easy learn",
                    email: "easylearn@gmail.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#28a745",
                },
            };
            const rzp1 = new Razorpay(options);

            rzp1.on("payment.failed", function () {
                message.error("payment failed");
                navigate("/student/payments");
            });
            rzp1.open();

        })

    }

    const verifyPayment = (payment, details) => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem('studentToken')
            }
        }
        verifyPaymentAPI({ payment, details }, headers).then((response) => {
            if (response.status === 200) {
                message.success("Successfully completed payment");
                setIsModalOpen(false)
            }

        })
            .catch(() => {
                message.error("Payment failed");
                setIsModalOpen(false)

            });
    };



    return (
        <div className='container'>
            <div className='container paymentParent'>
                <div className='d-flex justify-content-end'>
                    {
                        feeClosed ?
                        <div className='container d-flex justify-content-center'>
                        <h3>You successfully closed your entire course fee</h3>

                        </div>
                            :
                            <button onClick={openModal} className='btn btn-success me-3 mb-2'> Completer your Payment</button>

                    }
                    {isModalOpen && (
                        <div className="ModalPayment">
                            <div className="modalPayment-content">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <div className='container mt-4'>
                                    <div className='d-flex justify-content-center  mt-3'>
                                        <p><strong>Fee payment</strong></p>
                                    </div>
                                    <div className='table-responsive'>

                                        <table class="table table-borderless">

                                            <tbody>
                                                <tr>
                                                    <th scope="row">choose an option</th>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <input
                                                                value="One time settlement"
                                                                checked={selectedOption === "One time settlement"}
                                                                onChange={handleOptionChange}
                                                                type="radio" id="option1"
                                                                name="options"
                                                            />
                                                            <label className='ms-1' for="option1">One time settlment</label>

                                                        </div>
                                                        <div className='d-flex'>
                                                            <input
                                                                value="Installment"
                                                                checked={selectedOption === "Installment"}
                                                                onChange={handleOptionChange}
                                                                type="radio"
                                                                id="option1"
                                                                name="options"
                                                            />
                                                            <label className='ms-1' for="option2">Installment</label>
                                                        </div>


                                            </td>

                                                </tr>
                                                <tr>
                                                    <th scope="row">Total course fee</th>
                                                    <td>₹ {feeDetails.totalFee}</td>

                                                </tr>
                                                <tr>
                                                    <th scope="row">Pending amount</th>
                                                    <td>₹ {feeDetails.pendingFee}</td>

                                                </tr>
                                                <tr>
                                                    <th scope="row">Amount to pay now</th>
                                                    <td> <strong>
                                                        ₹ {
                                                            selectedOption === "One time settlement" ?
                                                                feeDetails.pendingFee :
                                                                feeDetails.installmentAmount
                                                        }
                                                    </strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className='d-flex justify-content-center'>
                                            <button onClick={handlePayment} className='btn btn-success'>Make payment</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className='container d-flex flex-wrap justify-content-between align-items-center'>

                    <div className='flexchildPayment' >
                        <div className='d-flex justify-content-center align-items-center mt-3'>
                            <h5 style={{textDecoration:"underline"}}>Payment history</h5>
                        </div>
                        <div className='container mt-4'>
                            {
                                feeDetails.pendingFee > 1 && (
                            <p >
                                <strong>
                                    Remaining amount to pay : ₹{feeDetails.pendingFee}
                                </strong>
                            </p>
                                )
}
                        </div>
                        <div className='container mt-1 table-responsive '>
                            { paymentDetails.length !==0 ?
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">NO</th>
                                        <th scope="col">Refference id</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paymentDetails.map((obj, index) => {

                                            const date = obj.createdAt
                                            const paidDate = new Date(date);
                                            const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                            const readableDate = paidDate.toLocaleDateString('en-US', options);
                                            return (
                                                <tr key={obj._id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{obj._id}</td>
                                                    <td>{readableDate}</td>
                                                    <td>{obj.amount}</td>
                                                    <td className='text-success'><strong>{obj.status}</strong></td>
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </table>
                            :
                            <div className='container mt-5 d-flex justify-content-center align-items-center'>
                                  <h3>You have no payment history</h3>
                            </div>
}
                        </div>
                    </div>

                    <div className='flexchildPayment' >
                        <div className='d-flex justify-content-center align-items-center mt-3'>
                            <h5 style={{textDecoration:"underline"}} >Fee structure</h5>
                        </div>
                        <div className='container mt-4'>
                            <p className='feeStructurepara'>

                                Your entire course fee is <strong>{feeDetails.totalFee}</strong>.
                                We offer two payment options for your fee. a one-time settlement
                                or installment payments. If you choose to pay in installments,
                                you will be required to make four payments in total. If you start
                                with installment payments and later decide to switch to a one-time
                                settlement, you will have the option to pay the remaining balance
                                in full as a one-time payment.

                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Payment
