import React from 'react'
import ActivityForm from '../../Components/ActivityForm/ActivityForm'

function Activity() {
  return (
    <>
        <div className='col-11 col-md-10 content_Wrapper'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <h2 className='page_header'>Activity Manage</h2>
            </div>

            <ActivityForm />
        </div>
    </>
  )
}

export default Activity