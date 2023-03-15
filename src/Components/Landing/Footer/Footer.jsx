import React from 'react'
import Logo from '../../Office/Logo/Logo'
import './Footer.css'
function Footer() {
  return (
    <div className='bg4'>
      <div className='container d-flex flex-wrap justify-content-between'>
        <div>
          <div className='mt-3'>
            <Logo />
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur <br />
            Curabitur sagittis ornare ligula, eu pel<br />
            blandit volutpat. Praesent euismod gra<br />

          </p>

        </div>
        <div>

          <h6 className='mt-4 mb-5'>About</h6>
          <p >FAQ</p>
          <p>Careers</p>
          <p>News</p>
        </div>
        
        <div>

          <h6 className='mt-4 mb-5'>Get in touch</h6>
          <p>10/3, kozhikode north <br />
            easylearn.com<br />
            +999999999
          </p>
        </div>

        <div>

          <h6 className='mt-4 mb-4'>Get our app</h6>
          <img style={{ marginLeft: "-18px", marginTop: "19px", width: "200px" }} src="/images/down.png" alt="" />

        </div>

      </div>
    </div>
  )
}

export default Footer
