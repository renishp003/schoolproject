import React from 'react'
import { CloseButton, Offcanvas } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import Sidebar from '../Sidebar/Sidebar'

function OffCanvasSidebar(props) {
    const LogoutUser = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't Logout!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#F08A1D',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Successfull!',
              'You are logout.',
              'success'
            )
            localStorage.clear();
            window.location.reload()
          }
        })
      }
    return (
        <>
            <Offcanvas show={props.show} onHide={() => props.close(false)} backdrop='static'>
                {/* <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header> */}
                <Offcanvas.Body className='p-0'>
                    <div className='sidebar'>
                        <CloseButton variant="white" className='float-end p-2 me-2 mt-2' onClick={() => props.close(false)} />
                        <div className='d-flex flex-column align-items-center text-white'>
                            <img src="/images/user.png" alt="" width='35%' className='mt-4' />
                            <h3 className=''>{props.schoolName}</h3>
                        </div>
                        <hr className='text-white my-4' />
                        <div className='menu'>
                            {
                                props.RouteData?.map((x, i) => {
                                    return <NavLink key={i} to={`/${props.pathName}/${x.link}`} onClick={() => props.close(false)}><box-icon type='solid' color='#F08A1D' size='xs' name={x.icon}></box-icon><span className='ms-1'>{x.displayText}</span></NavLink>
                                })
                            }
                        </div>
                        <hr className='text-white my-4' />
                        <div className='menu'>
                            <span className='logout_btn' onClick={() => LogoutUser()}>Logout</span>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default OffCanvasSidebar