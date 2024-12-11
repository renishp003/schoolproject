import axios from 'axios';
import React from 'react'
import { Accordion } from 'react-bootstrap';
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { AdminHeaders, ApiHttp, errorPopup, successPopup } from '../../Constant';
import { addclassTeacherData, getclassTeacherData } from '../../Redux/Actions/classTeacherAction';

function ClassTeacher() {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({});
    const allClassAndDivisionData = useSelector(state => state.classAndDivision.classAndDivision);
    const allClassTeacher = useSelector(state => state.classTeacher.classTeacher);
    const AllStandard = [...new Set(allClassAndDivisionData.map((x) => x?.standard))];
    const AllDivision = [...new Set(allClassAndDivisionData.map((x) => x?.division))];
    const allTeacher = useSelector(state => state.teacher.teacher);
    const allStudent = useSelector(state => state.student.student);
    const dispatch = useDispatch()
    const CancelForm = () => {
        reset()
    }
    const addNewClassTeacher = (data) => {
        dispatch(addclassTeacherData(data))
    }
    const removeStudent = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                    axios.post(`${ApiHttp}/classTeacher/removeOne` , {studentId : id} ,AdminHeaders   ).then(res => {
                       if(res.data.isSuccess){
                        successPopup(res.data.message)
                        dispatch(getclassTeacherData())
                       }
                       else{
                        errorPopup(res.data.message)
                       }
                    })
            }
        })
    }
    return (
        <>
            <div className='col-11 col-md-10 content_Wrapper'>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <h2 className='page_header'>Class Teacher</h2>
                </div>

                <div className='row blank_card align-items-center'>
                    <h5 className='mb-3'><b>Add Class Teacher</b></h5>

                    <div className='col-4'>
                        <label className='form_label'>Teacher</label>
                        <select className='text_input' {...register("teacherId", { required: true })}>
                            <option value="" selected disabled>--select teacher name--</option>
                            {
                                allTeacher?.map((x, i) => {
                                    return <option key={i} value={x._id}>{x.name}</option>
                                })
                            }
                        </select>
                        <p className='Error_Message'>{errors.teacherId && <span>Teacher is required</span>}</p>
                    </div>

                    <div className='col-4'>
                        <label className='form_label'>Standard</label>
                        <select className='text_input' {...register("standard", { required: true })}>
                            <option value="" selected disabled>--select standard--</option>
                            {
                                AllStandard?.map((x, i) => {
                                    return <option key={i} value={x}>{x}</option>
                                })
                            }
                        </select>
                        <p className='Error_Message'>{errors.standard && <span>Standard is required</span>}</p>
                    </div>

                    <div className='col-4'>
                        <label className='form_label'>Division</label>
                        <select className='text_input' {...register("division", { required: true })}>
                            <option value="" selected disabled>--select division--</option>
                            {
                                AllDivision?.map((x, i) => {
                                    return <option key={i} value={x}>{x}</option>
                                })
                            }
                        </select>
                        <p className='Error_Message'>{errors.division && <span>Divison is required</span>}</p>
                    </div>

                    <div className='col-4 '>
                        <button className='theme_btn' onClick={handleSubmit(addNewClassTeacher)}>Add</button>
                        <button className='theme_btn_dark ms-2' onClick={CancelForm}>Cancel</button>
                    </div>
                </div>
                
                <h5>Teacher name | Standard | Division</h5>
                <Accordion className='shadow-lg'>
                    {
                        allClassTeacher?.map((x, i) => {
                            
                            return <Accordion.Item key={i} eventKey={i}>
                                    <Accordion.Header>
                                        <span className='px-3'>{allTeacher.find((a) => a._id == x.teacherId)?.name}</span> |
                                        <span className='px-3'>{x.standard}</span> | 
                                        <span className='px-3'>{x.division}</span>
                                        </Accordion.Header>
                                    <Accordion.Body>
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
                                                    x.studentId.map((y,index) => {
                                                        let data = allStudent.find((a) => a._id == y)
                                                        if(data){
                                                            return <tr>
                                                            <td>{index+1}</td>
                                                            <td>{data.surname}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.fatherName}</td>
                                                            <td>{data.email}</td>
                                                            <td>{data.mobile}</td>
                                                            <td>
                                                                <button className='btn btn-danger py-1' onClick={() => removeStudent(data._id)}>Remove</button>
                                                            </td>
                                                        </tr>
                                                        }else{
                                                            return <tr>
                                                                {/* <td colSpan={6}>
                                                                There is not data.
                                                                </td> */}
                                                                </tr>
                                                        }
                                                    })
                                                }
                                            </tbody>
                                        </table>
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

export default ClassTeacher