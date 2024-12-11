import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Nursery = () => {
    return (
        <div>
            <Header />
            <div className=' w-100 py-5'>
                <div className='w-75 m-auto'>
                    <div id='top' className='row'>
                        <div className='col-lg-6'>
                            <h1 style={{ color: "#616368" }} className="mb-2">Nursery</h1>
                            <div className="AgeDurationInside">
                                <div className='p-2'>
                                    <strong>Age Group</strong>
                                    <span>2.5 - 3.5 Years</span>
                                </div>
                                <div className='p-2'>
                                    <strong>Duration</strong>
                                    <span>2.5 hours/day</span>
                                </div>
                            </div>
                            <p className='text mt-3'>
                                To set a firm foundation in the early years of preschool, quality early childhood education is vital for the overall development of a child. Our nursery syllabus has the right array of activities and learning environment that helps a child move towards achieving their early learning goals.                            </p>
                            <p className='text'>
                                Quality education in the early years of preschool lays a strong foundation to develop socially and emotionally. The nursery education engages children in school readiness activities such as reading, writing, counting, number recognition, and problem solving. Children learn in a fun-filled but purposeful manner. Children are encouraged to display their learning experiences through collaborative activities in the areas of dramatics, science, and arts
                            </p>
                        </div>
                        <div className='col-lg-6'>
                            <div className='imgdiv m-auto'>
                                <img src="./images/kids/kids2.jpg" className='img-fluid img_border' alt="" />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <h2 class="header2">
                            Key Areas of Learning for Nursery Children
                            </h2>
                            <ul class="list">
                                <li>Developing communication skills</li>
                                <li>Expression through art and drama</li>
                                <li>Math and Language Skill Development</li>
                                <li> Opportunities for fine and gross motor development</li>
                                <li>Promoting cognitive development</li>
                            </ul>
                        </div>
                        <div className='col-lg-6'>
                            <h2 class="header2">
                            Activities Involved
                            </h2>
                            <ul class="list">
                                <li>Circle Time</li>
                                <li>Free Play </li>
                                <li>Knowledge Time </li>
                                <li>Language Time</li>
                                <li>Artsy </li>
                                <li>Personality Development </li>
                                <li>Showstopper </li>
                                <li>Mental Might</li>
                                <li>Eco-conscious</li>
                                <li>Numeracy Time</li>
                                <li>Tell-a-Tale</li>
                                <li>Library</li>
                                <li>Talk Time</li>
                                <li>Sciencify</li>
                                <li>Outdoor</li>
                                <li>Indoor</li>
                                <li>Whirl &amp; Twirl</li>
                                <li>Sensorium</li>
                                <li>Critical Thinking</li>
                                <li>Celebration of festivals and special days</li>
                                <li>Field Trips</li>
                                <li>Puppet shows and skits</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Nursery