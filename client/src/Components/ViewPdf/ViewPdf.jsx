import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { teacherToken } from '../../Constant'
import { deleteAssignment, getPdf } from '../../Redux/Actions/assignmentAction'
import './ViewPdf.css'

function ViewPdf(props) {
    const [show, setshow] = useState(false)
    const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch()
    const openDialog = () => {
        setshow(true)
    }

    const CancelForm = () => {
        setshow(false)
    }
    const deleteAssig = (assObj , teacherObj) => {
        Swal.fire({
            title: `Do you want Delete File??`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Cancel`,
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAssignment({std : assObj.classes.std, sub : assObj.classes.sub, div : assObj.classes.div , assignmentName: props.name}))
            }
          })
    }

    const  download = async(name) => {
        let file = await getPdf({ assignmentName: name});
    }
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    return (
        <>
            <div className='col-6 col-sm-4 col-md-3 col-lg-2 text-center' >
                <Card className='w-100 border-0 shadow-lg h-100 position-relative'> 
                    <BsThreeDotsVertical className='position-absolute cursor_pointer HVR' style={{ right: '10px', top: '10px' }}  />
                    <div className='hoverMenu' >
                         {
                            props.isShowDelete?
                            <div onClick={() => deleteAssig(props.assObj , props.teacherObj)} style={{fontSize:'12px'}}>Delete</div>
                            : <></>
                         }
                        <div onClick={() => download(props.name)} style={{fontSize:'12px'}}>Download</div>
                    </div>
                    <Card.Img variant="top" src="/viewPdf.png" className='cursor_pointer pt-2'  onClick={openDialog} />
                    <Card.Body  onClick={openDialog} className='cursor_pointer p-1 px-2'>
                        <Card.Text style={{fontSize:'12px'}}>{props.name}</Card.Text>
                    </Card.Body>
                </Card>
                {/* <div className='col p-1 shadow-lg text-center cursor_pointer position-relative' style={{ borderRadius: '10px' }} >
                    <BsThreeDotsVertical className='position-absolute' style={{ right: '10px', top: '10px' }} />
                    <img src="/viewPdf.png" alt="" width={100} onClick={openDialog} />
                    <p onClick={openDialog}>{props.name}</p>
                </div> */}
            </div>

            <Modal show={show} fullscreen={true} size="" backdrop="static">
                <Modal.Header className='bg_theme_dark'>
                    <h4 className='page_card_header text-white mb-0 '>{props.name}</h4>
                    <FaTimes size={20} color='white' onClick={CancelForm} className='cursor_pointer' />
                </Modal.Header>
                <Modal.Body>
                {/* <div className='w-100'>
                    <Document file={`/assignments/${props.name}`} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </div> */}
                    <iframe src={`/assignments/${props.name}`} width="100%" className='' style={{ height: '85vh' }} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewPdf