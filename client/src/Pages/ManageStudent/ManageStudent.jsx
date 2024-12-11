import React, { useEffect, useState } from 'react'
import './ManageStudent.css'
import { useDispatch, useSelector } from 'react-redux'
import TableComman from '../../Components/TableCommon/TableComman'
import { useForm } from 'react-hook-form';
import { addStudentData, deleteMultipleStudentData, deleteSingleStudentData, exportStudent } from '../../Redux/Actions/studentAction';
import AddStudentDialog from '../../Components/AddStudentDialog/AddStudentDialog';
import Swal from 'sweetalert2';
import { checkAdminPassword } from '../../Redux/Actions/adminAction';
import EditStudentDialog from '../../Components/EditStudentDialog/EditStudentDialog';
import { AdminHeaders, AdminToken, ApiHttp, errorPopup, getStudentById, successPopup } from '../../Constant';
import { Dropdown } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';

function ManageStudent() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({});
  const allStudent = useSelector(state => state.student.student)
  const dispatch = useDispatch()
  const [filterArray, setfilterArray] = useState([])
  const [showAddNew, setshowAddNew] = useState(false)
  const [formValue, setformValue] = useState({ recordNum: '' })
  const [editObj, seteditObj] = useState({})
  const [deleteManyIdArray, setdeleteManyIdArray] = useState([])
  let [File, setFile] = useState()
  const columnnArray = ['grno', 'email', 'surname', 'name', 'fatherName', 'mobile', 'standard', 'division', 'fees', 'batch', 'address', 'birthDate', 'admissionDate', 'studentCurrentYear']
  // useEffect(() => {
  //   filterData({...formValue})
  // }, [allStudent])
  useEffect(() => {
    setfilterArray([...allStudent])
  }, [allStudent])



  const filterData = (data) => {
    setformValue({ ...data })
    if (data.standard == "All" && data.division == "All") {
      setfilterArray([...allStudent])
    }
    else {
      setfilterArray([...allStudent.filter((x) => (x.standard == data.standard) && (x.division == data.division))])
    }
  }
  const addStudent = (e) => {
    e.preventDefault()
    if (formValue.recordNum != '0' && formValue.recordNum != '') {
      dispatch(addStudentData({ recordNum: formValue.recordNum }))
      setformValue({ recordNum: '' })
    }
  }
  const getMultiFieldValue = (e) => {
    if (e.target.value <= 10) {
      setformValue({ recordNum: e.target.value })
    }
  }

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const handleShowAddDialog = () => {
    return setShowAddDialog(!showAddDialog)
  }
  const handleShowEditDialog = () => {
    return setShowEditDialog(!showEditDialog)
  }
  const addSingle = () => {
    setshowAddNew(false)
    handleShowAddDialog();
  }

  const editSingle = async (id) => {
    handleShowEditDialog();
    seteditObj({ ...allStudent.find(x => x._id == id) })

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
            if (typeof deleteId == 'string') {
              dispatch(deleteSingleStudentData(deleteId))
            }
            else {
              dispatch(deleteMultipleStudentData(deleteId))
            }
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
  const deleteManyData = () => {
    if (deleteManyIdArray.length == 0) {
      Swal.fire({
        title: 'Not a single record selected!!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#fa7305'
      })
    }
    else {
      deleteRecord(deleteManyIdArray)
      setdeleteManyIdArray([])
    }
  }

  const getDeleteManyId = (e) => {
    if (e.target.checked && !deleteManyIdArray.includes(e.target.value)) {
      deleteManyIdArray.push(e.target.value)
      setdeleteManyIdArray([...deleteManyIdArray])
    }
    else {
      setdeleteManyIdArray([...deleteManyIdArray.filter(x => x != e.target.value)])
    }
  }

  const selectAll = () => {
    filterArray.forEach(x => {
      if (!deleteManyIdArray.includes(x._id)) {
        deleteManyIdArray.push(x._id)
        setdeleteManyIdArray([...deleteManyIdArray])
      }
    })
  }

  const cancelSelected = () => {
    setdeleteManyIdArray([]);
  }
  const exportStudentData = () => {
    exportStudent()
  }

  const handleOnChange = (e) => {
    File = e.target.files[0];
    setFile(File);
    console.log(File)
    if (File) {
      Swal.fire({
        title: 'Do you want to Import this file',
        showCancelButton: true,
        confirmButtonText: 'YES',
      }).then((result) => {
        if (result.isConfirmed) {
          if (File) {
            uploadCsv();
            File = undefined;
            setFile(File)
          }
        }
      })
    }
  };
  const uploadCsv = async () => {
    const formData = new FormData();
    formData.append('csv', File);
    const header = {
      headers: {
        'Authorization': 'Bearer ' + AdminToken
      }
    }
    await axios.post(`${ApiHttp}/student/addByCsv`, formData, header).then(res => {
      console.log(res)
      if (res.data.isSuccess) {
        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
        })
      }
      else {
        return Swal.fire({
          position: 'center',
          icon: 'warning',
          title: res.data.message,
          showConfirmButton: false,
        })
      }
    })
  };
  return (
    <>
      <div className='col-11 col-md-10 content_Wrapper'>
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <h2 className='page_header'>Student</h2>
          <div>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Actions"
              menuVariant="light"
              className='d-inline-block theme_btn_outline' >
              <p className='m-0 my-1 ms-2 cursor_pointer text-dark'><label htmlFor="csvi" className='cursor_pointer'>Import</label></p>
              <p className='m-0 my-1 ms-2 cursor_pointer' onClick={() => exportStudentData()}>Export</p>
              <input type="file" id='csvi' className='d-none' onChange={handleOnChange} />
              {/* <NavDropdown.Item  >
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => exportStudentData()}>Export</NavDropdown.Item> */}
            </NavDropdown>
            {/* <form action=""> */}
            {/* <label htmlFor="csvi">sadf</label>
            <input type="file" id='csvi'/> */}
            {/* </form> */}
            <button className='theme_btn_outline ms-2' style={{ backgroundColor: 'var(--bg-dark-blue)', color: 'white' }} onClick={() => addSingle()}>+ Add One</button>
            {/* <button className='theme_btn_outline ms-2' onClick={() => setshowAddNew(!showAddNew)}>+ Add Multiple</button> */}
            {/* <button className='theme_btn_outline ms-2' onClick={() => exportStudentData()}>Export</button>
            <button className='theme_btn_outline ms-2' onClick={() => exportStudentData()}>Import</button> */}
          </div>
        </div>
        {/* <div className={`blank_card ${showAddNew ? 'd-block' : 'd-none'}`} style={{animation: "anim .3s ease-in-out"}}>
          <h5 className='mb-3'><b>Add new student</b></h5>
          <form action="">
          <div className='row align-items-center'>
            <div className='col-4'>
              <label htmlFor="" className='form_label mt-0'>Number of record</label>
              <input type="text" className='text_input' placeholder='ex: 1' value={formValue.recordNum}  onChange={getMultiFieldValue}/>
            </div>
            <div className='col-12 mt-3'>
              <input type='submit' className='theme_btn' onClick={addStudent}></input>
              <button type='button' className='theme_btn bg-danger ms-3' onClick={() => setshowAddNew(false)}>Cancel</button>
            </div>
          </div>
          </form>
        </div> */}

        <div className='blank_card'>
          <h5 className='mb-3'><b>Select to filter student data</b></h5>
          <div className='row align-items-center'>
            <div className='col-4'>
              <label htmlFor="" className='form_label mt-0'>Select Standard</label>
              <select name="standard" className='text_input' {...register("standard", { required: true })}>
                {/* <option disabled selected value=''> Select Standard</option> */}
                <option value='All' >All</option>
                {
                  [...new Map(allStudent.filter(entry => entry.standard.trim() != '').map(item =>
                    [item['standard'], item])).values()]?.map((x, i) => {
                      return <option key={i} value={x.standard}>{x.standard}</option>
                    })
                }
              </select>
              <p className='Error_Message'>{errors.standard && <span>Standard is required</span>}</p>
            </div>
            <div className='col-4'>
              <label htmlFor="" className='form_label mt-0'>Select Division</label>
              <select name="division" className='text_input' {...register("division", { required: true })}>
                {/* <option disabled selected value=''> Select Division</option> */}
                <option value='All'>All</option>
                {
                  [...new Map(allStudent.filter(entry => entry.standard.trim() != '').map(item =>
                    [item['division'], item])).values()]?.map((x, i) => {
                      return <option key={i} value={x.division}>{x.division}</option>
                    })
                }
              </select>
              <p className='Error_Message'>{errors.division && <span>Division is required</span>}</p>

            </div>
            <div className='col-4'>
              <button className='float-end theme_btn' onClick={handleSubmit(filterData)}>Filter</button>
            </div>
          </div>

        </div>


        {
          deleteManyIdArray.length > 0 ?
            <span className='d-inline-block mb-3 cursor_pointer hover_Underline' onClick={() => cancelSelected()}>Cancel selected</span>
            :
            <span className='d-inline-block mb-3 cursor_pointer hover_Underline' onClick={() => selectAll()}>Select All</span>
        }
        <span className='mx-3'> | </span>
        <span className='d-inline-block mb-3 cursor_pointer hover_Underline' onClick={() => deleteManyData()}> Delete selected </span>
        <TableComman data={filterArray} deleteRecord={deleteRecord} editSingle={editSingle} getDeleteManyId={getDeleteManyId} deleteManyIdArray={deleteManyIdArray} columnnArray={columnnArray} isAction={true} isDeleteAll={true} />
      </div>


      <AddStudentDialog show={showAddDialog} handleShow={handleShowAddDialog} />
      <EditStudentDialog show={showEditDialog} handleShow={handleShowEditDialog} editObj={editObj} />
    </>
  )
}

export default ManageStudent