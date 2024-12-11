import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'

const Contact = () => {
    return (
        <>
      <Header />
            <div id='contact' className='d-flex justify-content-center align-items-center flex-column'>

            <Row className='w-75 text-center mb-5'>
                <Col><h2 id='con-title'>Conatct Us</h2></Col>
            </Row>

            <Row className='w-75 d-flex justify-content-between'>
                <Col lg={6}>
                    <div id="address">
                        <Row className='add'>
                            <Col>
                            <div>
                                <div className='heading mb-3 w-50'>
                                    <h3 className='fw-700 m-0 ms-1'>Main Branch</h3>
                                </div>
                                <h4 id='b-name'>MNJ Patel Pre-school</h4>
                                <p className='area'>Varachha Main Road,Oppo Kapodra Police station, Surat, Gujarat 395006</p>
                            </div>
                            </Col>
                        </Row>
                        <Row className='add'>
                            <Col>
                            <div>
                                <div className='heading  mb-3 w-50'>
                                    <h3 className='fw-700 m-0 ms-1'>Call Us</h3>
                                </div>
                                <p className='area'>09099031531</p>
                                <p className='area'>Monday to Friday 7:00 am to 5.00 pm</p>
                            </div>
                            </Col>
                        </Row>
                        <Row className='add'>
                            <Col>
                            <div>
                                <div className='heading mb-3 w-50'>
                                    <h3 className='fw-700 m-0 ms-1'>Email Us</h3>
                                </div>
                                <p className='area'>Feedback: feedback@gmail.com</p>
                            </div>
                            </Col>
                        </Row>
                     
                    </div>
                </Col>
                <Col lg={6}>
                    <div id='map' className='w-100'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.2386957275007!2d72.87370917508647!3d21.22238128047583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f6b5b8a7da1%3A0xf0a1ae2a6f43ae82!2sM%20N%20J%20Patel%20High%20School!5e0!3m2!1sen!2sin!4v1706796183655!5m2!1sen!2sin" width="100%" height="100%"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                </Col>
            </Row>
        </div>
            <Footer />
        </>
    )
}

export default Contact