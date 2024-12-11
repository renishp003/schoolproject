import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import TableComman from '../../Components/TableCommon/TableComman'
import { checkAdminPassword } from '../../Redux/Actions/adminAction';
import { addTeacherData, addTeacherNewWork, deleteTeacherData, deleteTeacherNewWork, editTeacherData, editTeacherNewWork, editTeacherWork } from '../../Redux/Actions/teacherAction';

function Staff() {
  const allClassAndDivisionData = useSelector(state => state.classAndDivision.classAndDivision);
  const allClassTeacher = useSelector(state => state.classTeacher.classTeacher);
  const allTeacherClassWork = useSelector(state => state.teacherClassWork.teacherClassWork);
  const AllStandard = [...new Set(allClassAndDivisionData.map((x) => x?.standard))];
  const AllDivision = [...new Set(allClassAndDivisionData.map((x) => x?.division))];
  const { register, handleSubmit, watch, formState: { errors }, reset , setValue } = useForm({});
  const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 }, reset: reset1 } = useForm({});
  const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2 , setValue:setValue2 } = useForm({});
  const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 }, reset: reset3 , setValue:setValue3 } = useForm({});
  const [password, setpassword] = useState("");
  const columnnArray = ['surname', 'name', 'work', 'email', 'birthDate', 'gender', 'mobile']
  const [show, setshow] = useState(false)
  const [show1, setshow1] = useState(false)
  const [show2, setshow2] = useState(false)
  const allTeacher = useSelector(state => state.teacher.teacher)
  const dispatch = useDispatch()
  const [addNewWrokId, setaddNewWrokId] = useState('')
  const [editId, seteditId] = useState('')
  const [openEditTeacher, setopenEditTeacher] = useState(false)
  const addNew = () => {
    setshow(true)
  }
  const CancelForm = () => {
    setshow(false)
    reset()
  }
  const CancelForm1 = () => {
    setshow1(false)
    reset()
  }
  const CancelEditDialog = () => {
    setopenEditTeacher(false)
    reset2()
  }
  const addTeacher = (data) => {
    dispatch(addTeacherData(data))
    CancelForm()
    CancelForm1()
  }
  const deleteRecord = (deleteId) => {
    Swal.fire({
      title: 'Enter your account password to delete record',
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
            dispatch(deleteTeacherData(deleteId))
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
  const addNewTeacherWork = (data) => {
    setaddNewWrokId(data)
    setshow1(true)
  }

  const addNewWork = (data) => {
    data.id = addNewWrokId;
    dispatch(addTeacherNewWork(data))
    CancelForm1()
    setaddNewWrokId('')
  }
  const editSingle = (id, obj) => {
    seteditId(id)
    setopenEditTeacher(true)
    for(let key in obj){
      setValue2(key , obj[key])
    }
  }
  const editTeacher = (data) => {
    data.id = editId;
    dispatch(editTeacherData(data))
    seteditId('')
    CancelEditDialog()
  }
  const deleteWork = (teacherObj , workObj) => {
    Swal.fire({
      title: `Do you want to delete ${teacherObj.name}'s work`,
      text : `Subject : ${workObj.sub} | Standard : ${workObj.std} | Division : ${workObj.div}`,
      showDenyButton: false,
      confirmButtonText: 'DELETE',
      showCancelButton : true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeacherNewWork({teacherId : teacherObj._id, workId : workObj._id}))
      }
    })
  }
  const editWork = (teacherObj , workObj) => {
    workObj.teacherId = teacherObj._id;
    for(let key in workObj){
      setValue3(key , workObj[key])
    }
    setshow2(true)
  }
  const CancelForm3 = () => {
    setshow2(false)
    reset3()
  }
  const editExistWork = (data) => {
    dispatch(editTeacherWork(data))
    CancelForm3()
  }
  return (
    <div className='col-11 col-md-10 content_Wrapper'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <h2 className='page_header'>Teacher</h2>
        <div>
          <button className='theme_btn_outline' style={{ backgroundColor: 'var(--bg-dark-blue)', color: 'white' }} onClick={() => addNew()}>+ Add One</button>
        </div>
      </div>
      <TableComman data={allTeacher} deleteWork={deleteWork} editWork={editWork} editSingle={editSingle} addNewTeacherWork={addNewTeacherWork} deleteRecord={deleteRecord} columnnArray={columnnArray} isAction={true} isDeleteAll={true} />

      <Modal show={show1} fullscreen={'sm-down'} size="lg" backdrop="static">
        <Modal.Header className='bg_theme_dark'>
          <h4 className='page_card_header text-white mb-0 '>ADD NEW WORK</h4>
          <FaTimes size={20} color='white' onClick={CancelForm1} className='cursor_pointer' />
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-4'>
              <label className='form_label'>Standard</label>
              <select className='text_input' {...register1("std", { required: true })}>
                  <option value="" selected disabled>--select standard--</option>
                  {
                      AllStandard?.map((x, i) => {
                          return <option key={i} value={x}>{x}</option>
                      })
                  }
              </select>
              <p className='Error_Message'>{errors1.std && <span>Standard is required</span>}</p>
            </div>

            <div className='col-4'>
              <label className='form_label'>Subject</label>
              <input type="text" name='sub' className='text_input' placeholder='ex: Maths' {...register1("sub", { required: true })} />
              <p className='Error_Message'>{errors1.sub && <span>Subject is required</span>}</p>
            </div>

            <div className='col-4'>
              <label className='form_label'>Division</label>
              <select className='text_input' {...register1("div", { required: true })}>
                  <option value="" selected disabled>--select division--</option>
                  {
                      AllDivision?.map((x, i) => {
                          return <option key={i} value={x}>{x}</option>
                      })
                  }
              </select>
              <p className='Error_Message'>{errors1.div && <span>Divison is required</span>}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-start'>
          <button className='theme_btn' onClick={handleSubmit1(addNewWork)}>Add</button>
          <button className='theme_btn_dark' onClick={CancelForm1}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} fullscreen={'sm-down'} size="lg" backdrop="static">
        <Modal.Header className='bg_theme_dark'>
          <h4 className='page_card_header text-white mb-0'>ADD NEW TEACHER</h4>
          <FaTimes size={20} color='white' onClick={CancelForm} className='cursor_pointer' />
        </Modal.Header>
        <Modal.Body>

          <form action="" id='form' className='px-3'>
            <div className='row'>
              <div className='col-6'>
                <label className='form_label'>Surname</label>
                <input type="text" name='surname' className='text_input' placeholder='ex: Patel' {...register("surname", { required: true })} />
                <p className='Error_Message'>{errors.surname && <span>Surname is required</span>}</p>
              </div>
              <div className='col-6'>
                <label className='form_label'>Teacher Name</label>
                <input type="text" name='name' className='text_input' placeholder='ex: Varun' {...register("name", { required: true })} />
                <p className='Error_Message'>{errors.name && <span>Name is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Email</label>
                <input type="email" name='email' className='text_input' placeholder='ex: example@gmail.com' {...register("email", { required: true })} />
                <p className='Error_Message'>{errors.email && <span>Email is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Gender</label>
                <select name="gender" className='text_input'  {...register("gender", { required: true })}>
                  <option disabled value=''>--select gender--</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
                <p className='Error_Message'>{errors.gender && <span>Gender is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Password</label>
                <input type="password" name='password' className='text_input' placeholder='ex: abc@123' {...register("password", { required: true, minLength: { value: 8, message: "Password must have at least 8 characters" } })} onChangeCapture={(e) => setpassword(e.target.value)} />
                {(!errors.password?.message && errors.password) ? <p className='Error_Message'>{<span>Password is required</span>}</p> : ''}
                {errors.password?.message && <p className='Error_Message'><span>Password must have at least 8 characters</span> </p>}
              </div>

              <div className='col-6'>
                <label className='form_label'>Confirm Password</label>
                <input type="password" name='confirmPassword' className='text_input' placeholder='ex: abc@123' {...register("confirmPassword", { required: true, validate: value => value === password || "The passwords do not match" })} />
                <p className='Error_Message'>{errors.confirmPassword?.message && <span>Password do not match </span>}</p>
              </div>

              {/* <div className='col-4'>
                <label className='form_label'>Standard</label>
                <input type="Number" name='std' className='text_input' placeholder='ex: 1/2/3/4..' {...register("std", { required: true })} />
                <p className='Error_Message'>{errors.std && <span>Standard is required</span>}</p>
              </div>

              <div className='col-4'>
                <label className='form_label'>Subject</label>
                <input type="text" name='sub' className='text_input' placeholder='ex: Maths' {...register("sub", { required: true })} />
                <p className='Error_Message'>{errors.sub && <span>Subject is required</span>}</p>
              </div>

              <div className='col-4'>
                <label className='form_label'>Division</label>
                <input type="text" name='div' className='text_input' placeholder='ex:  A/B/C/D' {...register("div", { required: true })} />
                <p className='Error_Message'>{errors.div && <span>Divison is required</span>}</p>
              </div> */}

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

              {/* <div className='col-12'>
              <label className='form_label'>Address</label>
              <textarea name="address"className='text_input' style={{resize:'none'}} placeholder="ex: 101, patel Nagar , near varachha , surat." cols="30" rows="2" {...register("address", { required: true })}></textarea>
              <p className='Error_Message'>{errors.address && <span>Address is required</span>}</p>
            </div> */}

            </div>
          </form>

        </Modal.Body>
        <Modal.Footer className='justify-content-start'>
          <button className='theme_btn' onClick={handleSubmit(addTeacher)}>Add</button>
          <button className='theme_btn_dark' onClick={CancelForm}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={openEditTeacher} fullscreen={'sm-down'} size="lg" backdrop="static">
        <Modal.Header className='bg_theme_dark'>
          <h4 className='page_card_header text-white mb-0'>EDIT TEACHER</h4>
          <FaTimes size={20} color='white' onClick={CancelEditDialog} className='cursor_pointer' />
        </Modal.Header>
        <Modal.Body>

          <form action="" id='form' className='px-3'>
            <div className='row'>
              <div className='col-6'>
                <label className='form_label'>Surname</label>
                <input type="text" name='surname' className='text_input' placeholder='ex: Patel' {...register2("surname", { required: true })} />
                <p className='Error_Message'>{errors.surname && <span>Surname is required</span>}</p>
              </div>
              <div className='col-6'>
                <label className='form_label'>Teacher Name</label>
                <input type="text" name='name' className='text_input' placeholder='ex: Varun' {...register2("name", { required: true })} />
                <p className='Error_Message'>{errors.name && <span>Name is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Email</label>
                <input type="email" name='email' className='text_input pointer_event_none' placeholder='ex: example@gmail.com' {...register2("email", { required: true })} />
                <p className='Error_Message'>{errors.email && <span>Email is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Gender</label>
                <select name="gender" className='text_input'  {...register2("gender", { required: true })}>
                  <option disabled value=''>--select gender--</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
                <p className='Error_Message'>{errors.gender && <span>Gender is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Mobile Number</label>
                <input type="number" name='mobile' className='text_input' placeholder='ex: 1234567890' {...register2("mobile", { required: true })} />
                <p className='Error_Message'>{errors.mobile && <span>Mobile no. is required</span>}</p>
              </div>

              <div className='col-6'>
                <label className='form_label'>Date of birth</label>
                <input type="date" name='birthDate' className='text_input' {...register2("birthDate", { required: true })} />
                <p className='Error_Message'>{errors.birthDate && <span>Birth Date is required</span>}</p>
              </div>

            </div>
          </form>

        </Modal.Body>
        <Modal.Footer className='justify-content-start'>
          <button className='theme_btn' onClick={handleSubmit2(editTeacher)}>Add</button>
          <button className='theme_btn_dark' onClick={CancelEditDialog}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} fullscreen={'sm-down'} size="lg" backdrop="static">
        <Modal.Header className='bg_theme_dark'>
          <h4 className='page_card_header text-white mb-0 '>EDIT WORK</h4>
          <FaTimes size={20} color='white' onClick={CancelForm1} className='cursor_pointer' />
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-4'>
              <label className='form_label'>Standard</label>
              <input type="Number" name='std' className='text_input' placeholder='ex: 1/2/3/4..' {...register3("std", { required: true })} />
              <p className='Error_Message'>{errors3.std && <span>Standard is required</span>}</p>
            </div>

            <div className='col-4'>
              <label className='form_label'>Subject</label>
              <input type="text" name='sub' className='text_input' placeholder='ex: Maths' {...register3("sub", { required: true })} />
              <p className='Error_Message'>{errors3.sub && <span>Subject is required</span>}</p>
            </div>

            <div className='col-4'>
              <label className='form_label'>Division</label>
              <input type="text" name='div' className='text_input' placeholder='ex: A/B/C/D' {...register3("div", { required: true })} />
              <p className='Error_Message'>{errors3.div && <span>Divison is required</span>}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-start'>
          <button className='theme_btn' onClick={handleSubmit3(editExistWork)}>EDIT</button>
          <button className='theme_btn_dark' onClick={CancelForm3}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Staff