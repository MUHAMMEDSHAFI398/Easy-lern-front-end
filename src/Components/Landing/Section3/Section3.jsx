import React from 'react'
import './Section3.css'

function Section3() {
    return (
        <div className='bg3'>
            <div className='d-flex justify-content-center '>
                <h3 className='mt-3'>Gallery</h3>

            </div>
            <div className='paraentSection3 d-flex flex-wrap justify-content-between mt-3 '>
                <img className='gallary-image mb-4' src="/images/lab.jpeg" alt="cant not load" />
                <img className='gallary-image mb-4' src="/images/library.jpeg" alt="cant not load" />
                <img className='gallary-image mb-4' src="/images/pic5.jpeg" alt="cant not load" />
                <img className='gallary-image mb-4' src="/images/convo.jpeg" alt="cant not load" />
                <img className='gallary-image mb-4' src="/images/pic1.jpeg" alt="cant not load" />
                <img className='gallary-image mb-4' src="/images/pic2.jpeg" alt="cant not load" />
                <img className='gallary-image mb-4' src="/images/pic3.jpeg" alt="cant not load" />
                <img className='gallary-image mb-4' src="/images/pic4.jpeg" alt="cant not load" />
            </div>
        </div>
    ) 
}

export default Section3

