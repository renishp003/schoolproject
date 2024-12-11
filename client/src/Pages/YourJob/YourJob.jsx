import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { getTeacherClassWorkYourStudent } from '../../Constant'

function YourJob() {
    const [data, setdata] = useState([])
    const allStudent = useSelector(state => state.student.student);
    useEffect(() => {
        getYourJobData()
    }, [])
    

const getYourJobData = async () => {
    setdata(await getTeacherClassWorkYourStudent())
}
  return (
    <>
         <div className='col-10 col-md-10 content_Wrapper'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <h2 className='page_header'>Your Jobs</h2>
            </div>

            <h2 className={`text-danger ${data?.work?.length > 0 ? 'd-none' : 'd-block'}`}>Currently, You are not teacher of any class.</h2>
            
            <h6>SUBJECT  |  STANDARD  |  DIVISION</h6>
            <Accordion className='shadow-lg'>
                    {
                        data?.work?.map((x, i) => {
                            
                            return <Accordion.Item key={i} eventKey={i}>
                                    <Accordion.Header>
                                        <span className='px-3'>{x.classes.sub}</span> |
                                        <span className='px-3'>{x.classes.std}</span> | 
                                        <span className='px-3'>{x.classes.div}</span>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    x?.students?.map((y,index) => {
                                                        let data = allStudent?.find((a) => a._id == y)
                                                        if(data){
                                                            return <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{data.surname}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.fatherName}</td>
                                                            <td>{data.email}</td>
                                                            <td>{data.mobile}</td>
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

export default YourJob