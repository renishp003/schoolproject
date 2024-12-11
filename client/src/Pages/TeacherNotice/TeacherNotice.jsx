import React from 'react'
import { useSelector } from 'react-redux'
import ImageZoomViwer from '../../Components/ImageZoomViwer/ImageZoomViwer'

function TeacherNotice() {
    let allNotice = useSelector(state => state.notice.notice)
  return (
    <>
         <div className='col-11 col-md-10 content_Wrapper'>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <h2 className='page_header'>Notices</h2>
                </div>

                <ImageZoomViwer data={allNotice} />
            </div>
    </>
  )
}

export default TeacherNotice