import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { EnquiryAdd } from '../../Constant';
import './Enquire.css'

function Enquire() {
  const { register, handleSubmit, watch, formState: { errors } ,reset , setValue , getValues } = useForm();
  const allAdmin = useSelector(state =>  state.admin.admin)
  const EnquireForm = (data) => {
    EnquiryAdd(data)
    reset()
  }
  
    return (
        <>
            <div className='py-5'>
                <div className='container'>
                    <div className='row g-0'>
                        <div className='col-12 col-md-8 col-lg-6 mx-auto'>
                            <form action="" className='bg-danger p-5 text-center' style={{clipPath: 'polygon(4% 0, 100% 6%, 100% 95%, 0% 100%) '}} >
                            <h5 className="fs-1 fsw-bold m-0 text-white text-center mb-5 section_heading">Enquire Now</h5>
                                <select className='text_input enquire_form' {...register("branchId", { required: true })}>
                                    <option value="" disabled>--Select Branch--</option>
                                    {
                                        allAdmin?.map((x,i) => {
                                            return <option key={i} value={x._id}>{x.branch}</option>
                                        })
                                    }
                                </select>
                                <p className='text-warning'>{errors.branchId && <span>Branch is required</span>}</p>

                                <input type="text" className='text_input enquire_form' placeholder='Student Name*' {...register("name", { required: true })}/>
                                <p className='text-warning'>{errors.name && <span>Name is required</span>}</p>

                                <input type="text" className='text_input enquire_form' placeholder='Parent Name*' {...register("parentsName", { required: true })}/>
                                <p className='text-warning'>{errors.parentsName && <span>Parent Name is required</span>}</p>

                                <input type="text" className='text_input enquire_form' placeholder='Parent Email ID*' {...register("email", { required: true })}/>
                                <p className='text-warning'>{errors.email && <span>Email is required</span>}</p>

                                <input type="number" className='text_input enquire_form' placeholder='Phone No.*' {...register("mobile", { required: true })}/>
                                <p className='text-warning'>{errors.mobile && <span>Phone no. is required</span>}</p>

                                <textarea name="enquiry" className='text_input enquire_form'  rows="5" placeholder='Your enquiry....' style={{resize:"none"}} {...register("enquiry", { required: true })}></textarea>
                                <p className='text-warning'>{errors.enquiry && <span>Please enter some details.</span>}</p>

                                <button type='button' className='btn text-white px-5 py-3' style={{backgroundColor:'var(--bg-blue)'}} onClick={handleSubmit(EnquireForm)}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Enquire