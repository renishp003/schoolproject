import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageZoomViwer from '../../Components/ImageZoomViwer/ImageZoomViwer'
import { errorPopup } from '../../Constant'
import { addNoticeData } from '../../Redux/Actions/noticeAction'

function Notice() {
    let blankObj = {userType : '' , noticeDiscription : '' ,noticeImage : '' }
    const [obj, setobj] = useState({...blankObj})
    let allNotice = useSelector(state => state.notice.notice)
    const [imageString, setimageString] = useState('')
    let imageRef = useRef();
    const dispatch = useDispatch()
    useEffect(() => {
      if(imageRef){
        imageRef.current.style.display = 'none';
      }
    }, [])
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
    
    const getValue = async (e) => {
        if(e.target.name == 'noticeImage')
        {
            obj.noticeImage = e.target?.files[0];
            if(obj.noticeImage && obj.noticeImage != ''){
                setimageString(await toBase64(obj.noticeImage))
                if(await toBase64(obj.noticeImage)){
                    imageRef.current.style.display = 'block'
                }
            }else{
                imageRef.current.style.display = 'none'
            }

        }else{
            obj[e.target.name] = e.target.value
        }
        setobj({...obj})
    }
    const addNotice = () => {
        if(obj.noticeDiscription != '' && obj.noticeImage != '' && obj.userType != ''){
            dispatch(addNoticeData(obj))
            setobj({...blankObj})
            imageRef.current.style.display = 'none'
        }else{
            errorPopup('Please enter all field.')
        }
    }
    const cancelForm = () => {
        setobj({...blankObj})
        imageRef.current.style.display = 'none'
    }
    return (
        <>
            <div className='col-11 col-md-10 content_Wrapper'>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <h2 className='page_header'>Notices</h2>
                </div>

                <div className='blank_card'>
                    <h5 className='mb-3'><b>Add new notice</b></h5>
                    <form action="">
                        <div className='row align-items-center'>
                            <div className='col-4'>
                                <label htmlFor="" className='form_label mt-0'>For Whom</label>
                                <select name="userType" className='text_input'  value={obj.userType} onChange={getValue}>
                                    <option value="All">All</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="" className='form_label mt-0'>Discription</label>
                                <input type="text" className='text_input' value={obj.noticeDiscription} name='noticeDiscription' placeholder='ex: Imform to all..' onChange={getValue} />
                            </div>
                            <div className='col-4'>
                                <label htmlFor="" className='form_label mt-0'>Select Notice Image</label>
                                <input type="file" className='text_input' name='noticeImage' onChange={getValue} />
                            </div>
                            <div className='col-4' ref={imageRef}>
                                <div className='p-2 shadow-lg mt-4'>
                                    <img src={imageString} alt="" width='100%' />
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button type='button' className='theme_btn' onClick={addNotice}>Submit</button>
                                <button type='button' className='theme_btn bg-danger ms-3' onClick={cancelForm}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>

                <ImageZoomViwer data={allNotice} isShowDelete={true} />
            </div>
        </>
    )
}

export default Notice