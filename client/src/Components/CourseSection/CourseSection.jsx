import React from 'react'
import CourseCard from '../CourseCard.jsx/CourseCard'

function CourseSection() {

    let data = [
        {
            title: 'Nursery',
            discription: 'Quality education in the early years of preschool sets a firm foundation in the overall development of a child.',
            ageGroup: '2.5 - 3.5 Years',
            duration: '2.5 hours/day',
            img : '/images/kids/kids1.jpg',
            bgColor : '#318573',
            navigate : '/nursery'
        },
        {
            title: 'Play Group',
            discription: 'Children start to explore the world around them as soon as they are born.',
            ageGroup: '1.5 - 2.5 Years',
            duration: '2.5 hours/day',
            img : '/images/kids/kids2.jpg',
            bgColor : 'rgb(230, 41, 104, 0.8)',
            navigate : '/playground'
        },
        {
            title: 'Kindergarten',
            discription: 'The transition from preschool to primary school is a crucial time of change for both children as well as their parents.',
            ageGroup: '3.5 - 5.5 Years',
            duration: '3.5 hours/day',
            img : '/images/kids/kids3.jpg',
            bgColor : '#3368bd',
            navigate : '/kindergarten'
        }
    ]
    return (
        <>
            <div className='container my-5'>
                <div className='row g-3'>
                    {
                        data.map((x, i) => {
                            return <div className='col-12 col-md-6 col-lg-4' key={i} >
                                <CourseCard  img={x.img} title={x.title} discription={x.discription} ageGroup={x.ageGroup} duration={x.duration} bgColor={x.bgColor} navigate={x.navigate}  />
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CourseSection