import React, { useEffect, useState } from "react";
import { getLoginStudent } from "../../Constant";
import Header from "../Header/Header";
import './StudentAccount.css'
import moment from "moment";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { checkStudentPassword, deleteSingleStudentData, editStudentByStudent } from '../../Redux/Actions/studentAction'
import StudentAssignment from "../StudentAssignment/StudentAssignment";
import StudentNotice from "../StudentNotice/StudentNotice";
function StudentAccount() {
  const [LoginStudent, setLoginStudent] = useState('')
  const { register, handleSubmit, watch, formState: { errors }, reset, setValue, getValues } = useForm({});
  const [isShow, setisShow] = useState(false)
  let menuArray = ['Profile', 'Assignment',  'Notice']
  const [activeClass, setactiveClass] = useState(menuArray[0])
  const dispatch = useDispatch()
  useEffect(() => {
    GetLoginStudent();
  }, [])
  const GetLoginStudent = async () => {
    let studentObj = await getLoginStudent();
    setLoginStudent(studentObj)
  }
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const logout = () => {
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
        window.location.href = '/'
      }
    })
  }
  const handleShow = async () => {
    let studentObj = await getLoginStudent();
    if (studentObj) {
      for (let key in studentObj) {
        setValue(key, studentObj[key])
      }
    }
    setisShow(true)
  }
  const CancelForm = () => {
    setisShow(false)
    reset()
  }
  const editStudent = (data) => {
    dispatch(editStudentByStudent(data))
    CancelForm()
  }
  return (
    <>
      <Header />
      <div className="content_Wrapper ">
        <div className="bg-white container shadow-lg student_profile">
          <div className="row">
            <div className="col-12 col-lg-3 px-0 pt-3" style={{ borderRight: '1px solid lightgray', minHeight:'600px' }}>
                <h5 className="ms-2">Account Facilities</h5>
              <div className="account_menu mt-3">
                {
                  menuArray?.map((x, i) => {
                    return <div className={activeClass == x ? 'activeClass' : ''} onClick={() => setactiveClass(x)}>{x}</div>
                  })
                }
              </div>
            </div>
            <div className="col-12 col-lg-9 p-4">
              <div className={activeClass == 'Profile' ? 'd-block' : 'd-none'}>
                <button className="btn btn-danger py-1 float-end" style={{ fontSize: '12px' }} onClick={handleShow}>Edit profile</button>
                <h2 className="display-6 mb-3">Profile</h2>
                <div className="student_Profile_Image" style={{ backgroundImage: LoginStudent?.profile ? `url("studentProfile/${LoginStudent?.profile}")` : 'url("images/user.jpg")' }}></div>
                <h4 className=" d-inline-block me-2 mt-2 fst-italic">{LoginStudent.name}</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <label>Surname</label>
                    <span>{LoginStudent?.surname}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Name</label>
                    <span>{LoginStudent?.name}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Father Name</label>
                    <span>{LoginStudent?.fatherName}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Standard</label>
                    <span>{LoginStudent?.standard}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Batch</label>
                    <span>{LoginStudent?.batch}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Division</label>
                    <span>{LoginStudent?.division}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Gr no.</label>
                    <span>{LoginStudent?.grno}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Address</label>
                    <span>{LoginStudent?.address}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Birth Date</label>
                    <span>{moment(LoginStudent?.birthDate).format("LL")}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Mobile no.</label>
                    <span>{LoginStudent?.mobile}</span>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Email</label>
                    <span>{LoginStudent?.email}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <button className="theme_btn" onClick={logOut}>LOGOUT</button>
                </div>
              </div>
              <div className={activeClass == 'Assignment' ? 'd-block' : 'd-none'}>
                <StudentAssignment />
              </div>
              <div className={activeClass == 'Notice' ? 'd-block' : 'd-none'}>
                <StudentNotice />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={isShow} fullscreen={'sm-down'} size="lg" backdrop="static">
        <Modal.Header className='bg_theme_dark'>
          <h4 className='page_card_header text-white mb-0'>EDIT PROFILE</h4>
          <FaTimes size={20} color='white' onClick={CancelForm} className='cursor_pointer' />
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
                <input type="email" name='email' className='text_input pointer_event_none' placeholder='ex: example@gmail.com' {...register("email", { required: true })} />
                <p className='Error_Message'>{errors.email && <span>Email is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Mobile Number</label>
                <input type="number" name='mobile' className='text_input' placeholder='ex: 1234567890' {...register("mobile", { required: true })} />
                <p className='Error_Message'>{errors.mobile && <span>Mobile no. is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Date of birth</label>
                <input type="date" name='birthDate' className='text_input' {...register("birthDate", { required: true })} />
                <p className='Error_Message'>{errors.birthDate && <span>Birth Date is required</span>}</p>
              </div>

              <div className='col-12'>
                <label className='form_label'>Address</label>
                <textarea name="address" className='text_input' style={{ resize: 'none' }} placeholder="ex: 101, patel Nagar , near varachha , surat." cols="30" rows="2" {...register("address", { required: true })}></textarea>
                <p className='Error_Message'>{errors.address && <span>Address is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Profile Photo</label>
                <input type="file" name='profile' className='text_input' {...register("profile")} />
              </div>

            </div>
          </form>

        </Modal.Body>
        <Modal.Footer className='justify-content-start'>
          <button className='theme_btn' onClick={handleSubmit(editStudent)}>Add</button>
          <button className='theme_btn_dark' onClick={CancelForm}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StudentAccount;
