import React from 'react'
import { CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import './Payment.css'
import { useEffect } from 'react';
import { paymentDataAPI } from '../../../Services/OfficeServices';
import { useState } from 'react';


function Payment() {

    let count =1;
    const [paymentData, setPaymentData] = useState([])
    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem("officeToken")
            }
        }
        paymentDataAPI(headers).then((response) => {
            if (response.status === 200) {
                setPaymentData(response.data.paymentData)
            }
        }).catch((err) => {
            console.log(err)
        })
    },[])

    const data = () => {
        return {
            columns: [
                {
                    label: 'NO',
                    field: 'slno',
                    width: 38,
                },
                {
                    label: 'Reg ID',
                    field: 'registerId',
                    width: 96,
                    attributes: {
                        'aria-controls': 'DataTable',
                        'aria-label': 'Name',
                    },
                },
                {
                    label: 'Name',
                    field: 'name',
                    width: 183,
                },
                {
                    label: 'Batch',
                    field: 'batch',
                    sort: 'disabled',
                    width: 96,
                },
                {
                    label: 'Refference ID',
                    field: 'refferenceid',
                    width: 262,
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    width: 76,
                },
                {
                    label: 'Date',
                    field: 'date',
                    width: 135,
                },

                {
                    label: 'Type',
                    field: 'paymenttype',
                    sort: 'disabled',
                    width: 112,
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'disabled',
                    width: 83,
                },
            ],

            rows: paymentData.map((obj) => {
                const dateString = obj.createdAt;
                const date = new Date(dateString);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const readableDate = date.toLocaleDateString('en-US', options);

                return {
                    key: obj._id,
                    slno: count++,
                    registerId: obj.registerId,
                    name: obj.name,
                    batch: obj.batch,
                    refferenceid: obj._id,
                    amount:obj.amount,
                    date:readableDate,
                    paymenttype: obj.type,
                    status: <p className={obj.status === "Paid" ? "greenStatus" : "orangeStatus"}>{obj.status}</p>

                }
            })

        };
    };
    return (
        <div className='container'>
            <div className='container mt-4'>
                <CDBContainer>
                    <div className='container paymet-border-div'>
                        <div className='d-flex align-items-center justify-content-center'>
                            <h5 className='mt-3' style={{ textDecoration: "underline" }}>All payments</h5>
                        </div>
                        <CDBCardBody>
                            <CDBDataTable
                                striped
                                bordered
                                hover
                                scrollX
                                data={data()}
                                materialSearch
                                entriesOptions={[5, 10, 15, 20, 25]}

                            />
                        </CDBCardBody>
                    </div>
                </CDBContainer>
            </div>
        </div>
    )
}

export default Payment
