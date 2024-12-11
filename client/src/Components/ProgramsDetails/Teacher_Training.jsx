import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Teacher_Training = () => {
    return (
        <div>
            <Header />
            <div className=' w-100 py-5'>
                <div className='w-75 m-auto'>
                    <div id='top' className='row'>
                        <div className='col'>
                            <h1 style={{ color: "#616368" }} className="mb-2">Teacher Training Programme</h1>
                            <p className='text mt-3'>
                           MNJ Patel Preschool Teacher Training Programme is aMNJ Patel Ltd initiative. Kidzee (Preschool vertical ofMNJ Patel Ltd) has set unrivalled standards in the CDE (Child Development & Education) space as a leader in ECCE (Early Childhood Care & Education). Kidzee is one of the leading preschool chains in India.
                            </p>
                            <p className='text'>
                            Our pedagogy, Péntemind nurtures the 'Learning Minds' in every child. It is a well-researched curriculum by our team of experts in preschool education. Early Childhood Education is now identified as the most critical need in the current global scenario. With increasing demands and recognition, there is a greater need for quality educators or preschool experts. This teacher training course will lead to the creation of world-class preschool educators.
                            </p>
                        </div>
                        
                        <div className='row'>
                        <div className='col'>
                            <h2 className="header2">
                            Programme Highlights of Teacher Training Programme
                            </h2>
                            <ul className="list">
                                <li>Effective classroom techniques for teachers - Each module of the course is based on what is the most effective method/practice for the child's development in a preschool setting or at home.</li>
                                <li>Lectures on instructional theory associated with hands-on learning experience - It is intended to improve and simplify understanding of Early Childhood theories and via their execution and implementation in a preschool classroom.</li>
                                <li>Theory lectures with hands-on experience - It is intended to improve and simplify understanding of Early Childhood theories and via their execution and implementation in a preschool classroom.</li>
                                <li>Industry experts as Guest Lecturers - Experts from various domains will be invited to interact with the participants in order to add value to their knowledge that will be gained from the ongoing trends in the industry.</li>
                                <li>Job Placement - Assistance to participants to secure a job at Kidzee or other preschools based on availability and achievements.</li>
                            </ul>
                        </div>
                    </div>
                        <div className='row'>
                        <div className='col mt-2'>
                            <h2 className="header2">
                            Course Details
                            </h2>
                            <p className='text mt-3'>
                            3 months theory + 1 month on field internship
                            </p>
                            <p className='text'>
                            Batch Capacity - 15 participants, 1 trainer (for ideal and effective learning)</p>
                            <p className='text'>
                            Eligibility - Females Only. Minimum H.S.C Passed and above 18 years of Age.</p>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Teacher_Training