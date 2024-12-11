import React from 'react'
import { BiPhoneCall } from 'react-icons/bi'

function EnrollTopNav() {
    return (
        <>
            <div className='text-center d-flex align-items-center d-sm-flex d-none' style={{ backgroundColor: 'var(--bg-orange)' }}>
                <div className='container py-2 d-flex justify-content-between align-items-center'>
                    <div>
                        <span>Enroll Your Child in a MNJ Patel PreSchool Today!!</span>
                        <button className='btn btn-light ms-3 py-1 hover_line'>Click Here</button>
                    </div>
                    <div style={{whiteSpace:'nowrap'}}>
                        <BiPhoneCall size={20} />
                        <span className='cursor_pointer hover_line ms-2'> +91 1234567890</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnrollTopNav