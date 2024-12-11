import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Kindergarten = () => {
    return (
        <div>
            <Header />
            <div className=' w-100 py-5'>
                <div className='w-75 m-auto'>
                    <div id='top' className='row'>
                        <div className='col-lg-6'>
                            <h1 style={{ color: "#616368" }} className="mb-2">Kindergarten</h1>
                            <div className="AgeDurationInside">
                                <div className='p-2'>
                                    <strong>Junior K.G.</strong>
                                    <span>3.5 - 4.5 Years</span>
                                </div>
                                <div className='p-2'>
                                    <strong>senior K.G.</strong>
                                    <span>4.5 - 5.5 Years</span>
                                </div>
                                <div className='p-2'>
                                    <strong>Duration</strong>
                                    <span>3.5 hours/day</span>
                                </div>
                            </div>
                            <p className='text mt-3'>
                                At Kidzee, the Kindergarten (KG) curriculum ensures a smooth transition to formal schooling. Children learn age-appropriate activities in various areas like English language, numbers, general knowledge, music, physical development, and art. Our Proprietary programmes for Phonics and school readiness makes us the one of the best preschools in India. Child development is measured thrice in a year using a well-designed assessment.</p>
                        </div>
                        <div className='col-lg-6'>
                            <div className='imgdiv m-auto'>
                                <img src="./images/kids/kids3.jpg" className='img-fluid img_border' alt="" />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <h2 class="header2">
                                Key Areas of Kindergarten Education:
                            </h2>
                            <ul class="list">
                                <li>Theme-based Concept</li>
                                <li>Phonics and Language</li>
                                <li>Personal, Social, and Emotional Growth</li>
                                <li>Communication skills</li>
                                <li>Performance Art</li>
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

export default Kindergarten