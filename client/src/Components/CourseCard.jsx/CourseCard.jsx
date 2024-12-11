import React from 'react'
import { useNavigate } from 'react-router-dom'

function CourseCard(props) {
const navigate = useNavigate()

    return (
        <>
            <div className="card border_none shadow h-100 hover_scal">
                <img src={props.img} className="card-img-top" alt="..." />
                <div className="card-body text-white p-5 pb-1 pt-4" style={{ backgroundColor: props.bgColor }}>
                    <h5 className="fs-2 mb-3" style={{ fontFamily: 'fantasy', letterSpacing: '1px', fontStyle: 'italic' }}>{props.title}</h5>
                    <p className="card-text" style={{ fontSize: '18px' }}>{props.discription}</p>

                </div>
                <div className="card-footer px-5 pb-5 border_none text-center" style={{ backgroundColor: props.bgColor }}>
                    <div className='bg-white text-dark d-flex justify-content-between' style={{ borderRadius:'7px' }}>
                        <div className='p-3 w-50' style={{ borderRight: '1px solid lightgray' }}>
                            <h5>Age Group</h5>
                            <span>{props.ageGroup}</span>
                        </div>
                        <div className='p-3 w-50'>
                            <h5>Duration</h5>
                            <span>{props.duration}</span>
                        </div>
                    </div>
                    <button className='p-2 mt-4 px-4 border_none text-white' style={{backgroundColor:'rgb(0,0,0,0.3)' , borderRadius:'30px'}} onClick={()=>navigate(props.navigate)}>Read More</button>
                </div>
            </div>
        </>
    )
}

export default CourseCard