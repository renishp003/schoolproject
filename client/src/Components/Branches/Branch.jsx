import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import TableComman from '../TableCommon/TableComman';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { addSchoolData } from '../../Redux/Actions/schoolAction';
import { addAdminData, deleteAdminData, editAdminData } from '../../Redux/Actions/adminAction';
import { confirmDeletePopup } from '../../Constant';
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

function Branch() {
    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be more than 6 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .min(6, "Password must be more than 6 characters")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
        branch: Yup.string()
            .required("Branch is required")
            .matches(/^\s*\S[\s\S]*$/, "Only accept in number or characters ")
            .matches(/^[a-zA-Z0-9- \s]+$/, "Only accept in number or characters "),
        email: Yup.string()
            .required("Email is required"),
    });

    const formSchema2 = Yup.object().shape({
        branch: Yup.string()
            .required("Branch is required")
            .matches(/^\s*\S[\s\S]*$/, "Only accept in number or characters ")
            .matches(/^[a-zA-Z0-9- \s]+$/, "Only accept in number or characters "),
        email: Yup.string()
            .required("Email is required"),
    });

    const { register, handleSubmit, watch, getValues, formState: { errors }, reset } = useForm({ mode: "onTouched", resolver: yupResolver(formSchema) });
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2 , setValue : setValue2 } = useForm({ mode: "onTouched", resolver: yupResolver(formSchema2) });
    const allSchoolData = useSelector(state => state.school.school)
    const allBranchData = useSelector(state => state.admin.admin)
    const dispatch = useDispatch()
    const columnnArray = ['branch', 'email']
    const [show, setshow] = useState(false)

    allSchoolData.forEach(x => {
        allBranchData.forEach(a => {
            if (a.schoolId == x._id) {
                a.schoolName = x.schoolName;
            }
        })
    })
    const addNewBranch = (data) => {
        dispatch(addAdminData(data))
        reset()
    }

    const deleteBranch = (id) => {
        confirmDeletePopup().then(result => {
            if (result.isConfirmed) {
                dispatch(deleteAdminData(id))
            }
        })
    }

    const editSingle = (id) => {
        setshow(true);
        let editObj = allBranchData.find(x => x._id == id)
        if(editObj){
            for(let key in editObj){
                if(key == 'fees'){
                    setValue2('fees' , String(editObj[key]))
                }
                else{
                    setValue2(key, editObj[key])
                }
            }
          }
    }

    const editBranch = (data) => {
        setshow(false);
        dispatch(editAdminData(data))
    }

    const CancelForm = () => {
        setshow(false);
        reset2();
        reset();
    }
    return (
        <>
            <div className='col-12 col-md-10 content_Wrapper'>
                <h2 className='page_header'>Branch</h2>
                <div className='blank_card'>
                    <h5 className='mb-3'><b>Add Branch</b></h5>

                    <form action="">
                        <div className='row align-items-center'>
                            <div className='col-4'>
                                <label htmlFor="" className='form_label mt-0'>Branch Name</label>
                                <input type="text" className='text_input' placeholder='ex: Vivekanand-2' {...register("branch", { required: true, validate: (value) => { return !!value.trim() } })} />
                                <p className='Error_Message'>{errors.branch && <span>{errors.branch.message}</span>}</p>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="" className='form_label mt-0'>Email</label>
                                <input type="email" className='text_input' placeholder='ex: example@gmail.com' {...register("email", { required: true, validate: (value) => { return !!value.trim() } })} />
                                <p className='Error_Message'>{errors.email && <span>{errors.email.message}</span>}</p>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="" className='form_label mt-0'>Password</label>
                                <input type="Password" name='password' className='text_input' placeholder='ex: example@123' {...register("password", { required: true, validate: (value) => { return !!value.trim() } })} />
                                <p className='Error_Message'>{errors.password && <span>{errors.password.message}</span>}</p>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="" className='form_label mt-0'>Confirm Password</label>
                                <input type="Password" name='confirmPassword' className='text_input' placeholder='ex: example@123' {...register("confirmPassword", {
                                    required: true
                                })} />
                                <p className='Error_Message'>{errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}</p>
                            </div>
                            <div className='col-12 mt-3'>
                                <input type='submit' className='theme_btn' value='Add' onClick={handleSubmit(addNewBranch)}></input>
                                <button type='button' className='theme_btn bg-danger ms-3' onClick={() => CancelForm()}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>

                <Modal show={show} fullscreen={'sm-down'} size="md" backdrop="static">
                    <Modal.Header className='bg_theme_dark'>
                        <h4 className='page_card_header text-white mb-0'>EDIT BRANCH</h4>
                        <FaTimes size={20} color='white' onClick={() => CancelForm()} className='cursor_pointer' />
                    </Modal.Header>
                    <Modal.Body>

                        <form action="" id='form' className='px-3'>
                            <div className='row align-items-center'>
                                <div className='col-12'>
                                    <label htmlFor="" className='form_label mt-0'>Branch Name</label>
                                    <input type="text" className='text_input' placeholder='ex: Vivekanand-2' {...register2("branch")} />
                                    <p className='Error_Message'>{errors2.branch && <span>{errors2.branch.message}</span>}</p>
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="" className='form_label mt-0'>Select school</label>
                                    <select name='schoolId' className='text_input pointer_event_none' {...register2("schoolId")}>
                                        <option value=''  disabled>Selecte branch</option>
                                        {
                                            allSchoolData.map((x, i) => {
                                                return <option key={i} value={x._id}>{x.schoolName}</option>
                                            })
                                        }
                                    </select>
                                    <p className='Error_Message'>{errors2.schoolId && <span>{errors2.schoolId.message}</span>}</p>
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="" className='form_label mt-0'>Email</label>
                                    <input type="email" className='text_input pointer_event_none' placeholder='ex: example@gmail.com' {...register2("email")} />
                                    <p className='Error_Message'>{errors2.email && <span>{errors2.email.message}</span>}</p>
                                </div>
                                
                            </div>
                    </form>

                </Modal.Body>
                <Modal.Footer className='justify-content-start'>
                    <button className='theme_btn' onClick={handleSubmit2(editBranch)}>EDIT</button>
                    <button className='theme_btn_dark' onClick={() => CancelForm()} >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

            <TableComman data={allBranchData} columnnArray={columnnArray} deleteRecord={deleteBranch} editSingle={editSingle} isAction={true} />
        </div>
        </>
    )
}

export default Branch