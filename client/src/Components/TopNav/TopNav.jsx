import React from 'react'
import Sidebar from '../Sidebar/Sidebar'

function TopNav(props) {
  return (
    <>
        <div>
            <Sidebar pathName={props.pathName} />
        </div>
    </>
  )
}

export default TopNav