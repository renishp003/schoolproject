import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import './TableCommon.css'
import {Link} from 'react-router-dom'
import moment from "moment";
import {BsPencil  } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RiDeleteBin5Line, RiEditFill } from "react-icons/ri";

function TableComman(props) {
  let data = props.data;
  return (
    <>
      <div className='table_div' style={{height: props.height ?? ''}}>
        <table className='common_table' >
          <thead className='common_table_header'>
            <tr>
              {
                props.isDeleteAll ? <th></th> : <></>
              }
              <th>No.</th>
              {
                props.columnnArray.map((x, i) => {
                  return <th key={i}>{x == 'work' ? <>Work <br /> [ Subject | Standard | Divison ]</> : x}</th>
                })
              }
              {
                props.isAction || props.isviewBranch ? <th>Action</th> : <></>
              }
            </tr>
          </thead>
          <tbody>
            {
              data?.length > 0 ?
                data?.map((x, i) => {
                  return (
                    <tr key={i}>
                      {
                        props.isDeleteAll ? <>
                          <td><input type="checkbox" value={x._id} name='deleteManyId' checked={props?.deleteManyIdArray?.includes(x._id)} onChange={props?.getDeleteManyId} /></td>
                        </> : <></>
                      }

                      <td>{i + 1}</td>
                      {
                        props.columnnArray.map((a,index) => {
                          if(a.toUpperCase().includes('DATE')){
                            // x[a] = convertDate(x[a])
                            x[a] = moment(x[a]).format("LL")
                          }
                          else if(a == 'fees'){
                            x[a] = x[a] ? 'Complated' : 'Remaining'
                          }else if(a == 'work'){
                            return (
                              <td key={index} > 
                                <div className='d-flex'>
                                  <div className='p-2' style={{width:'300px'}}>
                                    {
                                      x[a]?.map((f ,i) => {
                                        return <div className='row' key={i} style={{border:'1px solid lightgray'}}>
                                            <div className='col-6' style={{borderRight:'1px solid lightgray'}}><span className='d-inline-block p-1'>{f.sub}</span></div>
                                            <div className='col-2' style={{borderRight:'1px solid lightgray'}}><span className='d-inline-block p-1'>{f.std}</span></div>
                                            <div className='col-2' style={{borderRight:'1px solid lightgray'}}><span className='d-inline-block p-1'>{f.div}</span></div>
                                            {/* <div className='col-2' style={{borderRight:'1px solid lightgray'}}><span className='d-inline-block p-1'><RiEditFill color='green' className='cursor_pointer' onClick={() => props.editWork(x,f)} /></span></div> */}
                                            <div className='col-2'><span className='d-inline-block p-1'><RiDeleteBin5Line className='cursor_pointer' color='red' onClick={() => props.deleteWork(x,f)} /></span></div>
                                          </div>
                                      })
                                    }
                                  </div>
                                  <div className='ms-2'>
                                    <BiMessageSquareAdd className='cursor_pointer' onClick={() => props.addNewTeacherWork(x._id)} />
                                  </div>
                                </div>
                              </td>
                            )
                          }
                          return <td key={index}>{x[a]}</td>
                        })
                      }

                      {
                        props.isAction ?
                          <>
                            <td>
                              {
                                !props.isEdit ? <button className='theme_btn py-1 bg-primary text-white' onClick={() => props.editSingle(x._id , x)}>Edit</button> : <></>
                              }
                              <button className='theme_btn py-1 bg-danger text-white ms-2' onClick={() => props.deleteRecord(x._id)}>Delete</button>
                            </td>
                          </> : <></>
                      }
                      {
                        props.isviewBranch ?
                          <>
                            <td>
                              <Link to='../branch'><button className='theme_btn py-1 bg-danger text-white ms-2'>View branch</button></Link>
                            </td>
                          </> : <></>
                      }
                    </tr>
                  )
                }) :
                <tr className='text-center'>
                  <td colSpan='17'>There is no data in the table.</td>
                </tr>

            }
          </tbody>
        </table>
      </div>

    </>
  )
}

export default TableComman