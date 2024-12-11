import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { checkAdminPassword } from '../../Redux/Actions/adminAction';
import { addclassAndDivisionData, deleteclassAndDivisionData } from '../../Redux/Actions/classAndDivisionAction';

function ClassAndDivision() {
    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({});
    const allClassAndDivisionData = useSelector(state => state.classAndDivision.classAndDivision);
    const dispatch = useDispatch()
    const CancelForm = () => {
        reset()
        setValue('standard' , '')
        setValue('division' , '')
    }
    const addNewDiv = (data) => {
        dispatch(addclassAndDivisionData(data))
        CancelForm()
    }

    const deleteClass = (id) => {
        Swal.fire({
            title: 'Enter your account password to delete Class',
            input: 'password',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#fa7305',
            cancelButtonColor: '#1b2531',
            showLoaderOnConfirm: true,
            preConfirm: async (password) => {
              if (password) {
                let data = await checkAdminPassword(password)
                if (data.data.isSuccess) {
                  dispatch(deleteclassAndDivisionData(id))
                }
                else {
                  Swal.showValidationMessage(
                    data.data.message
                  )
                }
              }
              else {
                Swal.showValidationMessage(
                  `Password is required`
                )
              }
            }
          })
    }
    return (
        <>
            <div className='col-11 col-md-10 content_Wrapper'>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <h2 className='page_header'>Class and Division</h2>
                </div>

                <div className='row blank_card align-items-center'>
                    <h5 className='mb-3'><b>Add New Class</b></h5>
                    <div className='col-4'>
                        <label className='form_label'>Standard</label>
                        <input type="text" name='std' className='text_input' placeholder='ex: 1/2/3/4..' {...register("standard", { required: true })} />
                        <p className='Error_Message'>{errors.standard && <span>Standard is required</span>}</p>
                    </div>

                    <div className='col-4'>
                        <label className='form_label'>Division</label>
                        <input type="text" name='div' className='text_input' placeholder='ex: A/B/C/D' {...register("division", { required: true })} />
                        <p className='Error_Message'>{errors.division && <span>Divison is required</span>}</p>
                    </div>

                    <div className='col-4 '>
                        <button className='theme_btn' onClick={handleSubmit(addNewDiv)}>Add</button>
                        <button className='theme_btn_dark ms-2' onClick={CancelForm}>Cancel</button>
                    </div>
                </div>


                <div className='table_div'>
                    <table className='common_table' >
                        <thead className='common_table_header'>
                            <tr>
                                <th>No.</th>
                                <th>Standard</th>
                                <th>Division</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allClassAndDivisionData?.length > 0 ?
                                    <>
                                        {
                                            allClassAndDivisionData.sort((a,b) => a.standard - b.standard)?.map((x, i) => {
                                                return <tr key={i}>
                                                    <td>{i+1}</td>
                                                    <td>{x.standard}</td>
                                                    <td>{x.division}</td>
                                                    <td>
                                                        <button className='theme_btn py-1 bg-danger text-white ms-2' onClick={() => deleteClass(x._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </>
                                    :
                                    <>
                                        <tr className='text-center'>
                                            <td colSpan='17'>There is no data in the table.</td>
                                        </tr>
                                    </>
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default ClassAndDivision