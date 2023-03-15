import React from 'react'
import './Section2.css'
function Section2() {
    return (
        <div className='bg2'>
            <div className='paraentSection2 d-flex flex-wrap justify-content-between '>
                <img className='sec-2Image' src="/images/faq.png" alt="couldn't load" />

                <div className='rightChilid d-flex column flex-column'>
                    <div className='d-flex flex-column'>
                        <i className="iconBook fas fa-book-open"></i>
                        <h3>24*7 Library</h3>
                        <p className='quote2'>Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
                            Curabitur sagittis <br />ornare ligula, eu pellentesque nibh
                        </p>
                    </div>
                    <div className='d-flex flex-column mt-5'>
                        <i className="iconBook fas fa-book-open"></i>
                        <h3>More focus on practicals</h3>
                        <p className='quote2'>Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
                            Curabitur sagittis <br />ornare ligula, eu pellentesque nibh
                        </p>
                    </div>

                </div>

                <div className='rightChilid d-flex column flex-column'>
                    <div className='d-flex flex-column'>
                        <i className="iconBook fas fa-book-open"></i>
                        <h3>Extra curriculum</h3>
                        <p className='quote2'>Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
                            Curabitur sagittis <br />ornare ligula, eu pellentesque nibh
                        </p>
                    </div>
                    <div className='d-flex flex-column mt-5'>
                        <i className="iconBook fas fa-book-open"></i>
                        <h3>Experianced faculties</h3>
                        <p className='quote2'>Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
                            Curabitur sagittis <br />ornare ligula, eu pellentesque nibh
                        </p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Section2
