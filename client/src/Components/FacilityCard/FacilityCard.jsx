import React from 'react'

function FacilityCard(props) {
    return (
        <>
            <div className='d-flex flex-column align-items-center'>
                <div className='w-50 text-center p-4 d-flex justify-content-center align-items-center' style={{borderRadius:'50% 50% 0px 0px' , backgroundColor:'var(--bg-dark-blue)'}}>
                        {props.icon}
                </div>
                <div className='p-2 text-white text-center w-100' style={{backgroundColor : props.bgColor , borderRadius:'10px'}}>
                    <h5 className="fs-4 m-0" style={{ fontFamily: 'cursive', letterSpacing: '1px'}}>{props.title}</h5>
                </div>
            </div>
        </>
    )
}

export default FacilityCard