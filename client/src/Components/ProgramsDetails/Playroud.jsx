import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Playroud = () => {
    return (
        <div>
            <Header />
            <div className=' w-100 py-5'>
                <div className='w-75 m-auto'>
                    <div id='top' className='row'>
                        <div className='col-lg-6'>
                            <h1 style={{ color: "#616368" }} className="mb-2">Playgroup</h1>
                            <div className="AgeDurationInside">
                                <div className='p-2'>
                                    <strong>Age Group</strong>
                                    <span>1.5 - 2.5 Years</span>
                                </div>
                                <div className='p-2'>
                                    <strong>Duration</strong>
                                    <span>2.5 hours/day</span>
                                </div>
                            </div>
                            <p className='text mt-3'>
                                Children are born curious. They begin to explore the environment around them as soon as they are born. Kidzee’s playgroup school curriculum plays an important role in helping children continue their exploration.
                            </p>
                            <p className='text'>
                                The first few years of  a child's life are crucial and critical when it comes to the acquisition of skills and brain based learning. In the playgroup class, the young children  spend quality time and develop their latent language and math skills.
                            </p>
                        </div>
                        <div className='col-lg-6'>
                            <div className='imgdiv m-auto'>
                                <img src="./images/kids/kids1.jpg" className='img-fluid img_border' alt="" />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <h2 class="header2">
                                Key Areas in Playgroup Curriculum
                            </h2>
                            <ul class="list">
                                <li>Theme based Concept Time</li>
                                <li>Exploration based learning</li>
                                <li>Promoting positive peer social interaction </li>
                                <li>Math Readiness</li>
                                <li>Language Readiness</li>
                                <li>Promoting fine and gross motor skills</li>
                                <li>Promoting cognitive development</li>
                            </ul>
                        </div>
                        <div className='col-lg-6'>
                            <h2 class="header2">
                                Playgroup learning Activities Included
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

export default Playroud