import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiHttp, getLoginStudent, StudentHeaders } from '../../Constant';
import ViewPdf from '../ViewPdf/ViewPdf';
import './StudentAssignment.css'

function StudentAssignment(props) {
    let [assData, setassData] = useState([])
    let [activeC, setactiveC] = useState('')
    const [subAssignment, setsubAssignment] = useState([])

    useEffect(() => {
        getAssignmentStudentWise()
    }, [])


    const getAssignmentStudentWise = async () => {
        let studentObj = await getLoginStudent();
        axios.get(`${ApiHttp}/assignment/getForStudent`, StudentHeaders).then(async (res) => {
            const data = res.data.data
            let main = data.map((x) => x.work)
            let partOfData = []
            main.forEach(element => {
                element.forEach((a) => {
                    partOfData.push(a)
                })
            });
            partOfData = partOfData.filter((x) => (x.classes.std == studentObj?.standard) && (x.classes.div == studentObj?.division))
            assData = partOfData
            setassData(assData)
            activeC =  assData[0]?.classes?.sub;
            setactiveC(activeC)
            setsubAssignment(assData.find((x) => x.classes.sub == activeC)?.assignments)
        })
    }

    const setAssignment = (sub) => {
        setactiveC(sub)
        setsubAssignment(assData.find((x) => x.classes.sub == sub)?.assignments)
    }
    return (
        <>
            <h2 className="display-6 mb-3 ">Assignments</h2>
            <div className='student_Assignment_menu'>
                {
                    assData?.map((x, i) => {
                        return <p key={i} className={activeC == x.classes.sub ? 'pactive' : ''} onClick={() => setAssignment(x.classes.sub)}>{x.classes.sub}</p>
                    })
                }
            </div>
            <div>
                <div className='row g-3 mt-4'>
                    {
                        subAssignment?.map((x, ind) => {
                            return <ViewPdf key={ind} name={x} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default StudentAssignment