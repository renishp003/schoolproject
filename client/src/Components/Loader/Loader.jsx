import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { isLoaderShow } from '../../Constant'


 function Loader() {
    let isShow = useSelector(state => state.loader.loader)
  return (
    <>
    {
         isShow ? 
        <div className='loaderCom'>
                <Spinner style={{width:"100px" , height:"100px" , color : '#1d2d42'}} />
        </div> : <></>
    }
    </>
  )
}

export default Loader