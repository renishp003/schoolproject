import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { deleteNoticeData } from '../../Redux/Actions/noticeAction'
import {useDispatch} from 'react-redux'
import Swal from 'sweetalert2'
function ImageZoomViwer(props) {
    const [show, setshow] = useState(false)
    const [modalImg, setmodalImg] = useState('')
    const dispatch = useDispatch()
    const open = (x) => {
        setshow(true)
        setmodalImg(x)
    }
    const deleteNotice =(id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this notice!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteNoticeData(id))
            }
        })
    }
    return (
        <>
            <div>
                <div className='row g-3'>
                    {
                        props.data?.map((x, i) => {
                            return <div className='col-3' key={i}>
                                <Card className='w-100 border-0 shadow-lg h-100 position-relative p-2'>
                                {
                                            props.isShowDelete ?<span style={{ fontSize: '12px' }}>{x.userType}</span> : <></>
                                }
                                    <div>
                                        {
                                            props.isShowDelete ?
                                                <>
                                                    <BsThreeDotsVertical className='position-absolute cursor_pointer HVR' style={{ right: '10px', top: '10px' }} />
                                                    <div className='hoverMenu' onClick={() => deleteNotice(x._id)}>

                                                        <div style={{ fontSize: '12px' }}>Delete</div>
                                                    </div>
                                                </> : <></>
                                        }
                                    </div>
                                    <Card.Img variant="top mt-2" src={`/noticeImages/${x.noticeImage}`} className='cursor_pointer pt-2' onClick={() => open(x.noticeImage)} />
                                    <Card.Body onClick={() => open(x.noticeImage)} className='cursor_pointer p-1 px-2'>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Text style={{ fontSize: '12px' }}>{x.noticeDiscription}</Card.Text>
                                    </Card.Footer>
                                </Card>
                            </div>
                        })
                    }
                </div>
            </div>

            <Modal show={show} fullscreen={true} backdrop="static">
                <Modal.Body>
                    <FaTimes size={20} color="black" className="float-end cursor_pointer" onClick={() => setshow(false)} />
                    <div className='mx-auto' style={{ width: '70%' }}>
                        <img src={`/noticeImages/${modalImg}`} width='100%' className='cursor_pointer' alt="" />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ImageZoomViwer