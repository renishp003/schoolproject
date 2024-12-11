import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Accordion, Modal } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { AdminHeaders, AdminToken, ApiHttp, getLoginTeacher, getLoginUser, TeacherHeaders } from '../../Constant';
import { addStudentsInClass } from '../../Redux/Actions/classTeacherAction';
import { BsSearch } from "react-icons/bs";
import ViewPdf from '../../Components/ViewPdf/ViewPdf';
import { getTeacherData } from '../../Redux/Actions/teacherAction';

function YourClass() {
    const [show, setshow] = useState(false)
    let allStudentData = useSelector(state => state.student.student);
    const [allStudent, setallStudent] = useState([])
    const AllClassTeacher = useSelector(state => state.classTeacher.classTeacher);
    const [loginTeacher, setloginTeacher] = useState()
    const dispatch = useDispatch()
    let [studentIdArr, setstudentIdArr] = useState([])
    const [isAssignClassTeacher, setisAssignClassTeacher] = useState()
    const [availableStudent, setavailableStudent] = useState([])
    let [search, setsearch] = useState('')
    let [assData, setassData] = useState([])
    let [activeC, setactiveC] = useState('')
    const [subAssignment, setsubAssignment] = useState([])

    useEffect(() => {
        getAssignmentStudentWise()
    }, [])
    useLayoutEffect(() => {
        getLoginTeacherData();
    }, [])
    useEffect(() => {
        setallStudent([...allStudentData])
    }, [allStudentData])


    useEffect(() => {
        if (loginTeacher) {
            let data = AllClassTeacher?.find((x) => x.teacherId == loginTeacher._id)
            setisAssignClassTeacher(data)
        }
    }, [loginTeacher, AllClassTeacher])

    const getLoginTeacherData = async () => {
        setloginTeacher(await getLoginTeacher())
        getNotAssignableStudent();
    }
    const getNotAssignableStudent = (data) => {
        axios.get(`${ApiHttp}/classTeacher/notAssignedStudent`, AdminToken ? AdminHeaders : TeacherHeaders).then(res => {
            let arr = [];
            res.data.data.forEach((x) => {
                arr = [...arr, ...x]
            })
            setavailableStudent(arr)
        })
    }

    const openDialog = () => {
        let data = AllClassTeacher.find((x) => x.teacherId == loginTeacher._id)
        if (data) {
            getNotAssignableStudent()
            setstudentIdArr(data?.studentId)
            setshow(true)
        }
    }
    const CancelForm = () => {
        setshow(false)
    }
    const addStudent = () => {
        dispatch(addStudentsInClass({ studentId: studentIdArr }))
        CancelForm()
        searching()
    }
    const selectStudent = (id) => {
        if (studentIdArr.includes(id)) {
            studentIdArr = [...studentIdArr.filter(x => x != id)]
        } else {
            studentIdArr = [...studentIdArr, id]
        }
        setstudentIdArr([...studentIdArr])
    }
    const removeStudent = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                studentIdArr = [...studentIdArr.filter(x => x != id)]
                setstudentIdArr([...studentIdArr])
                addStudent()
            }
        })
    }
    const searching = (e) => {
        if (e.target.value != '') {
            let aa = allStudent.filter((x) => x.name.toUpperCase().includes(e.target.value.toUpperCase()))
            setallStudent(aa)
        }
        else {
            setallStudent([...allStudentData])
        }
    }



    const getAssignmentStudentWise = async () => {
        let teacher = await getLoginTeacher();
        let AllTeacher = await axios.get(`${ApiHttp}/teacher/get` , AdminToken ?AdminHeaders : TeacherHeaders).then(async(res) => {
             return res.data.data
         })
        await  axios.get(`${ApiHttp}/assignment/getForClassTeacher`, TeacherHeaders).then(async (res) => {
        
        const data = res.data.data.record;
            let classTeacher = res.data.data.classTeacher;
            if(AllTeacher){
                data.forEach(async(x,i) => {
                    let oneTeacher = await AllTeacher?.find(y => y._id == x.teacherId)
                    x?.work.forEach((y, index) => {
                        x.work[index].teacherName = oneTeacher?.name
                    })
                })
            }
            let work = data.map(x => x.work)
            let partOfData = [];
            work?.forEach(element => {
                element.forEach((a) => {
                    partOfData.push(a)
                })
            });
            partOfData = partOfData?.filter((x) => (x.classes.std == classTeacher.standard) && (x.classes.div == classTeacher.division))
            // partOfData = partOfData.filter((x) => (x.classes.std == studentObj?.standard) && (x.classes.div == studentObj?.division))
            console.log(partOfData);
            assData = partOfData;
            setassData(assData)
            activeC = assData[0]?.classes?.sub;
            setactiveC(activeC)
            setsubAssignment(assData.find((x) => x.classes.sub == activeC)?.assignments)
        })
    }

    const setAssignment = (sub) => {
        setactiveC(sub)
        setsubAssignment(assData.find((x) => x.classes.sub == sub)?.assignments)
    }
    return (
        <>
            <div className='col-11 col-md-10 content_Wrapper'>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <h2 className='page_header'>Your Class</h2>
                    {
                        isAssignClassTeacher ?
                            <div>
                                <button className='theme_btn_outline' style={{ backgroundColor: 'var(--bg-dark-blue)', color: 'white' }} onClick={openDialog}>+ Add One</button>
                            </div> : <></>
                    }
                </div>
                {
                    isAssignClassTeacher ?
                        <>
                            <div className='table_div'>
                                <table className='table common_table'>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Surname</th>
                                            <th>Student Name</th>
                                            <th>Father Name</th>
                                            <th>Email</th>
                                            <th>Mobile no.</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allStudent?.map((x, i) => {
                                                return isAssignClassTeacher?.studentId?.map((y, index) => {
                                                    if (x._id == y) {
                                                        return <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{x.surname}</td>
                                                            <td>{x.name}</td>
                                                            <td>{x.fatherName}</td>
                                                            <td>{x.email}</td>
                                                            <td>{x.mobile}</td>
                                                            <td>
                                                                <button className='btn btn-danger py-1' onClick={() => removeStudent(x._id)}>Remove</button>
                                                            </td>
                                                        </tr>
                                                    }
                                                })
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <>
                            <h3 className='fs-3 text-danger'>You are not class teacher of any class</h3>
                            <p className='text-danger'>Please infrom to admin office for the assign class teacher.</p>
                        </>
                }
                <Accordion className={isAssignClassTeacher ? 'shadow-lg mt-4' : ' d-none'}>
                    <Accordion.Item >
                        <Accordion.Header>
                            <h6 className='m-0'>Assignments</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className='student_Assignment_menu'>
                                {
                                    assData?.map((x, i) => {
                                        return <p key={i} className={activeC == x.classes.sub ? 'pactive' : ''} onClick={() => setAssignment(x.classes.sub)}>
                                            <div>{x.classes.sub}</div>
                                            <div style={{fontSize : '12px'}}>({x.teacherName})</div>
                                        </p>
                                    })
                                }
                            </div>
                            <div className='row g-3 mt-4'>
                                {
                                    subAssignment?.map((x, ind) => {
                                        return <ViewPdf key={ind} name={x} />
                                    })
                                }
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>



            <Modal show={show} fullscreen={'sm-down'} size="xl" backdrop="static">
                <Modal.Header className='bg_theme_dark'>
                    <h4 className='page_card_header text-white mb-0'>ALL STUDENTS</h4>
                    <FaTimes size={20} color='white' onClick={CancelForm} className='cursor_pointer' />
                </Modal.Header>
                <Modal.Body>

                    <div className='row'>
                        <div className='col-4'>
                            <input type="text" className='text_input' placeholder='Search..' onChange={searching} />
                        </div>
                        <div className='col-1 p-0'><BsSearch className='mt-2 cursor_pointer' size={20} /></div>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>No.</th>
                                <th>Surname</th>
                                <th>Name</th>
                                <th>Father Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                allStudent.filter(x => !availableStudent.includes(x._id)).length > 0 ?
                                    <>
                                        {

                                            allStudent.filter(x => !availableStudent.includes(x._id))?.map((x, i) => {
                                                return <tr key={i} className='cursor_pointer' onClick={() => selectStudent(x._id)}>
                                                    <td>
                                                        <input type="checkbox" value={x._id} checked={studentIdArr.includes(x._id)} style={{ width: '20px', height: '20px' }} />
                                                    </td>
                                                    <td>{i + 1}</td>
                                                    <td>{x.surname}</td>
                                                    <td>{x.name}</td>
                                                    <td>{x.fatherName}</td>
                                                </tr>
                                            })
                                        }
                                    </>
                                    :
                                    <> <tr><td colSpan={7} className='text-center'>There is no data available.</td></tr></>
                            }
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer className='justify-content-start'>
                    <button className='theme_btn' onClick={addStudent}>Add</button>
                    <button className='theme_btn_dark' onClick={CancelForm}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default YourClass