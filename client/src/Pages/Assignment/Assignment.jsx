import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ViewPdf from '../../Components/ViewPdf/ViewPdf';
import { getTeacherClassWorkYourStudent } from '../../Constant';
import { uploadNewAssignment } from '../../Redux/Actions/assignmentAction';

function Assignment() {
    const [data, setdata] = useState([])
    let [assignment, setassignment] = useState('')
    let [obj, setobj] = useState()
    const allStudent = useSelector(state => state.student.student);
    const allAssignment = useSelector(state => state.assignment.assignment);
    const dispatch = useDispatch();
    useEffect(() => {
        getYourJobData()
    }, [])
    

    const getAssignment = (e) =>{
        assignment = e.target.files[0]
        setassignment(assignment)
        if(assignment.type != 'application/pdf'){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Only PDF file support.',
                showConfirmButton: false,
                timer: 2000
              })
              assignment='';
              setassignment(assignment)
        }
        if(assignment && assignment !== '')
        {
            Swal.fire({
                title: `Do you want upload ${assignment.name} File??`,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(uploadNewAssignment({std : obj.classes.std , div: obj.classes.div , sub : obj.classes.sub , assignment:assignment}))
                    setassignment()
                    setobj()
                }
              })
        }
    }

    const getClassValue = (x) => {
        obj = x;
        setobj(obj)
    }
    const getYourJobData = async () => {
        setdata(await getTeacherClassWorkYourStudent())
    }

  return (
    <>
        <div className='col-10 col-md-10 content_Wrapper'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <h2 className='page_header'>All Assignments</h2>
            </div>

            <h2 className={`text-danger ${data?.work?.length > 0 ? 'd-none' : 'd-block'}`}>Currently, You are not teacher of any class.</h2>
            
            <h6  className={data?.work?.length > 0 ? 'd-block' : 'd-none'}>SUBJECT  |  STANDARD  |  DIVISION</h6>
            <Accordion className='shadow-lg'>
                    {
                        data?.work?.map((x, i) => {
                            
                            return <Accordion.Item key={i} eventKey={i}>
                                    <Accordion.Header>
                                        <span className='px-3'>{x.classes.sub}</span> |
                                        <span className='px-3'>{x.classes.std}</span> | 
                                        <span className='px-3'>{x.classes.div}</span>
                                        </Accordion.Header>
                                    <Accordion.Body>
                                        <div className='p-2'>
                                            <label type='button' htmlFor="assignment"  className='theme_btn p-1 px-2 mb-4 cursor_pointer' onClick={() => getClassValue(x)}>Upload new</label>
                                            <input type="file" id='assignment' className='d-none' onChange={getAssignment}/>
                                            {
                                                allAssignment?.work?.map((y,index) => {
                                                    if((y.classes.sub == x.classes.sub) && (y.classes.std == x.classes.std) && (y.classes.div == x.classes.div))
                                                    {
                                                        return <div className='row g-3'>
                                                            {
                                                                y?.assignments?.map((j,ind) => {
                                                                    return <ViewPdf isShowDelete={true}  name={j} assObj={y} teacherObj ={x} />
                                                                })
                                                            }
                                                        </div>
                                                    }
                                                })
                                            }
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                        })
                    }
                </Accordion>
        </div>
    </>
  )
}

export default Assignment