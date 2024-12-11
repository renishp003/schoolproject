import React from 'react'
import { useSelector } from 'react-redux'
import ImageZoomViwer from '../ImageZoomViwer/ImageZoomViwer'

function StudentNotice() {
    let allNotice = useSelector(state => state.notice.notice)
    return (
        <>
            <h2 className="display-6 mb-3 ">Notices</h2>
            <ImageZoomViwer data={allNotice} />
        </>
    )
}

export default StudentNotice