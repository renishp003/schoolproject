import React, { useState } from 'react'
import './Dashboard.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux';
import TableComman from '../../Components/TableCommon/TableComman';
import Calendar from 'react-calendar';

function Dashboard() {
  const [chartData, setchartData] = useState({
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        // text: 'Product Trends by Month',
        // align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    },


  })
  const allSchoolData = useSelector(state => state.school.school)
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch()
  const columnnArray = ['schoolName'];

  const getCalendarValue = (e) => {
    console.log(e)
  }
  return (
    <div className='col-11 col-md-10 content_Wrapper'>
      <h2 className='page_header'>Dashboard</h2>

      <div className='row g-4'>
        <div className='col-12'>
          <div className='page_card'>
            <div className='page_card_header'>
              <h6>Charts</h6>
              <BsThreeDotsVertical className='cursor_pointer page_card_header_icon' />
              <div className='page_card_header_icon_section'>
                <h6>view all</h6>
              </div>
            </div>
            <div id="chart">
              <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={300} />
            </div>
          </div>
        </div>

        <div className='col-7'>
          <TableComman data={allSchoolData} columnnArray={columnnArray} isviewBranch={true} height={345} />
        </div>

        <div className='col-5'>
          <div className='page_card'>
            <div className='page_card_header'>
              <h6>Charts</h6>
              <BsThreeDotsVertical className='cursor_pointer page_card_header_icon' />
              <div className='page_card_header_icon_section'>
                <h6>view all</h6>
              </div>
            </div>
            <Calendar onChange={getCalendarValue} value={value} />
          </div>
        </div>


      </div>
    </div>
  )
}

export default Dashboard