import React from 'react'
import { FaRegLightbulb } from 'react-icons/fa'
import { GiCctvCamera, GiHiveMind, GiPineapple } from 'react-icons/gi'
import FacilityCard from '../FacilityCard/FacilityCard'

function FacilitySection() {
    let data = [
        {
            icon: <GiCctvCamera size={60} color='white' />,
            title: 'SAFETY',
            bgColor: 'purple'
        },
        {
            icon: <GiPineapple size={60} color='white' />,
            title: 'TOTAL HEALTH & HYGIENE',
            bgColor: 'green'
        },
        {
            icon: <FaRegLightbulb size={60} color='white' />,
            title: 'NEXTGEN INNOVATIONS',
            bgColor: '#dbac0f'
        },
        {
            icon: <GiHiveMind size={60} color='white' />,
            title: '360 ° LEARNING',
            bgColor: '#d12c42'
        }
    ]
    return (
        <>
            <div style={{backgroundColor:'#E7F5F5'}}>
                <div className='container my-5 py-5 mb-0'>
                    <div className='row g-3'>
                        {
                            data.map((x, i) => {
                                return <div className='col-6 col-lg-3' key={i}>
                                    <FacilityCard title={x.title} icon={x.icon} bgColor={x.bgColor} />
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FacilitySection