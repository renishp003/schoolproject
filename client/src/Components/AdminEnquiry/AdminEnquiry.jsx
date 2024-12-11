import React, { useEffect, useState } from 'react'
import { getAEnquireData } from '../../Constant'
import TableComman from '../TableCommon/TableComman';

function AdminEnquiry() {
    const [AllEnquiries, setAllEnquiries] = useState([])
    let columnnArray = ['email' , 'name' , 'parentsName' , 'mobile' ]
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setAllEnquiries(await getAEnquireData())
    }
    
    return (
        <>
    <div className='col-11 col-md-10 content_Wrapper'>
    <h2 className='page_header'>All Enquiries</h2>
        <TableComman data={AllEnquiries}  columnnArray={columnnArray} isAction={false} isEdit={true}/>
    </div>
    </>
  )
}

export default AdminEnquiry