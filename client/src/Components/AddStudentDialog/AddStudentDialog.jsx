import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaTimes } from "react-icons/fa";
import { addSingleStudentData } from '../../Redux/Actions/studentAction';
import { useDispatch } from 'react-redux';

function AddStudentDialog(props) {
  const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } , reset} = useForm({});
    const [password, setpassword] = useState("");
    const [currentYearArray, setcurrentYearArray] = useState([]);
    const startCurrYear = new Date().getFullYear()-2;
    const endCurrYear = new Date().getFullYear()+5;
    for(let i = startCurrYear; i <= endCurrYear; i++){
        let year = i+'-'+String(i+1).slice(2);
        if(!currentYearArray.includes(year)){
            currentYearArray.push(year);
        }
    }

    const addStudent = (data) => {
        dispatch(addSingleStudentData(data));
        reset()
        CancelForm();
    }

    const CancelForm = () => {
        props.handleShow();
    }
    
  return (
    <>
      <Modal show={props.show} fullscreen={'sm-down'} size="lg" backdrop="static">
        <Modal.Header className='bg_theme_dark'>
        <h4 className='page_card_header text-white mb-0'>ADD NEW STUDENT</h4>
          <FaTimes size={20} color='white' onClick={props.handleShow} className='cursor_pointer' />
        </Modal.Header>
        <Modal.Body>

        <form action="" id='form' className='px-3'>
          <div className='row'>
            <div className='col-4'>
              <label className='form_label'>Surname</label>
              <input type="text" name='surname' className='text_input' placeholder='ex: Patel' {...register("surname", { required: true })} />
              <p className='Error_Message'>{errors.surname && <span>Surname is required</span>}</p>
            </div>
            <div className='col-4'>
              <label className='form_label'>Student Name</label>
              <input type="text" name='name' className='text_input' placeholder='ex: Varun' {...register("name", { required: true })} />
              <p className='Error_Message'>{errors.name && <span>Name is required</span>}</p>
            </div>
            <div className='col-4'>
              <label className='form_label'>Father Name</label>
              <input type="text" name='fatherName' className='text_input' placeholder='ex: Rakesh bhai' {...register("fatherName", { required: true })} />
              <p className='Error_Message'>{errors.fatherName && <span>Father Name is required</span>}</p>
            </div>
          
            <div className='col-12'>
              <label className='form_label'>Email</label>
              <input type="email" name='email' className='text_input' placeholder='ex: example@gmail.com' {...register("email", { required: true })} />
              <p className='Error_Message'>{errors.email && <span>Email is required</span>}</p>
            </div>

            <div className='col-6'>
              <label className='form_label'>Password</label>
              <input type="password" name='password' className='text_input' placeholder='ex: abc@123' {...register("password", { required: true , minLength: {value: 8,message: "Password must have at least 8 characters" }})} onChangeCapture={(e) => setpassword(e.target.value)} />
              {(!errors.password?.message && errors.password) ? <p className='Error_Message'>{<span>Password is required</span>}</p> :''}
              <p className='Error_Message'>{errors.password?.message && <span>Password must have at least 8 characters</span>}</p>
            </div>
  
            <div className='col-6'>
              <label className='form_label'>Confirm Password</label>
              <input type="password" name='confirmPassword' className='text_input' placeholder='ex: abc@123' {...register("confirmPassword", { required: true , validate : value => value === password || "The passwords do not match" })}  />
              <p className='Error_Message'>{errors.confirmPassword?.message && <span>Password do not match </span>}</p>
            </div>

            {/* <div className='col-4'>
              <label className='form_label'>Standard</label>
              <input type="Number" name='standard' className='text_input' placeholder='ex: 1/2/3/4..' {...register("standard", { required: true })}  />
              <p className='Error_Message'>{errors.standard && <span>Standard is required</span>}</p>
            </div>

            <div className='col-4'>
              <label className='form_label'>Division</label>
              <input type="text" name='division' className='text_input' placeholder='ex: A/B/C/D' {...register("division", { required: true })}  />
              <p className='Error_Message'>{errors.division && <span>Division is required</span>}</p>
            </div> */}

            <div className='col-6'>
              <label className='form_label'>Batch</label>
              <select name="batch" className='text_input' {...register("batch", { required: true })} >
                <option value="" disabled selected>Select Batch time</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
              <p className='Error_Message'>{errors.batch && <span>Batch is required</span>}</p>
            </div>

            <div className='col-6'>
              <label className='form_label'>Mobile Number</label>
              <input type="number" name='mobile' className='text_input' placeholder='ex: 1234567890' {...register("mobile", { required: true })}  />
              <p className='Error_Message'>{errors.mobile && <span>Mobile no. is required</span>}</p>
            </div>

            <div className='col-6'>
              <label className='form_label'>Date of birth</label>
              <input type="date" name='birthDate' className='text_input' {...register("birthDate", { required: true })}  />
              <p className='Error_Message'>{errors.birthDate && <span>Birth Date is required</span>}</p>
            </div>

            <div className='col-6'>
              <label className='form_label'>GR Number</label>
              <input type="number" name='grno' className='text_input' placeholder='ex: 202307' {...register("grno", { required: true })}  />
              <p className='Error_Message'>{errors.grno && <span>GR No. is required</span>}</p>
            </div>

            {/* <div className='col-6'>
              <label className='form_label'>Fees</label>
              <div className='mt-2'>
                <input type="radio" name='fees' className='me-1' value='true' placeholder='ex: 202307' {...register("fees", { required: true })}  /> <span className='me-2'>Paid</span>
                <input type="radio" name='fees' className='me-1' value='false' placeholder='ex: 202307' {...register("fees", { required: true })}  /> <span className='me-2'>Remaining</span>
              </div>
              <p className='Error_Message'>{errors.fees && <span>Fees is required</span>}</p>
            </div> */}

            <div className='col-6'>
              <label className='form_label'>Adminssion Date</label>
              <input type="date" name='admissionDate' className='text_input' {...register("admissionDate", { required: true })}  />
              <p className='Error_Message'>{errors.admissionDate && <span>Admission Date is required</span>}</p>
            </div>

            <div className='col-6'>
              <label className='form_label'>Current Year of Student</label>
              <select name="studentCurrentYear" className='text_input' {...register("studentCurrentYear", { required: true })} >
                <option value="" disabled>Select year</option>
                {
                    currentYearArray.map((x, i) => {
                        return <option key={i} value={x}>{x}</option>
                    })
                }
              </select>
              <p className='Error_Message'>{errors.studentCurrentYear && <span>Admission Date is required</span>}</p>
            </div>

            <div className='col-12'>
              <label className='form_label'>Address</label>
              <textarea name="address"className='text_input' style={{resize:'none'}} placeholder="ex: 101, patel Nagar , near varachha , surat." cols="30" rows="2" {...register("address", { required: true })}></textarea>
              <p className='Error_Message'>{errors.address && <span>Address is required</span>}</p>
            </div>

          </div>
       </form>

        </Modal.Body>
        <Modal.Footer className='justify-content-start'>
          <button className='theme_btn' onClick={handleSubmit(addStudent)}>Add</button>
          <button className='theme_btn_dark' onClick={CancelForm}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddStudentDialog