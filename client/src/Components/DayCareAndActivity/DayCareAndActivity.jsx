import React from 'react'
import { BiTimer } from 'react-icons/bi'

function DayCareAndActivity() {
    return (
        <>
            <div className='py-5' style={{backgroundColor:'#F08A1D'}}>
                <div className='container'>
                    <h5 className="fs-1 fsw-bold m-0 text-center mb-5 section_heading" >Daycare and Activities</h5>
                    <div className='row g-4'>
                        <div className='col-12 col-lg-4'>
                            <img src="/images/kids/kidsAll.jpg" alt="" width='100%' />
                        </div>
                        <div className='col-12 col-lg-8'>
                            <div className='d-flex'>
                                <div className='d-flex me-4'>
                                    <div><BiTimer size={60} /></div>
                                    <div className='ms-2'>
                                        <h3 className='m-0'>Full Day Care</h3>
                                        <p className='m-0 fs-5'>8:00 am to 8:00 pm</p>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div><BiTimer size={60} /></div>
                                    <div className='ms-2'>
                                        <h3 className='m-0'>Half Day Care</h3>
                                        <p className='m-0 fs-5'>8:00 am to 2:00 pm</p>
                                        <p className='m-0 fs-5'>2:00 pm to 8:00 pm</p>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex mt-4'>
                                <div className='w-50'>
                                    <ul>
                                        <li className='fs-4'>Spacious Area</li>
                                        <li className='fs-4'>Fresh and Healthy Food</li>
                                        <li className='fs-4'>Safe and Hygiene Environment</li>
                                        <li className='fs-4'>Trained Staff</li>
                                    </ul>
                                </div>
                                <div className='ms-3 w-50'>
                                    <ul>
                                        <li className='fs-4'>Regular Updated</li>
                                        <li className='fs-4'>Learning, Games, Activities, Sand Play, Water Play, Painting, Music, Dance and Lots of Fun Times with Play Methods</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DayCareAndActivity