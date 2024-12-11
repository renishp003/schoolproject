import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import EnrollTopNav from "../../Components/EnrollTopNav/EnrollTopNav";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import about1 from './../../image/bgimage1.jpeg'
import about2 from './../../image/aboutimg2.jpeg'
import teacher1 from './../../image/about1.jpg'
import teacher2 from './../../image/about2.jpeg'
import teacher3 from './../../image/about3.jpeg'
import teacher4 from './../../image/about4.jpeg'
import { FaFacebookF, FaPinterest, FaSchool, FaTwitter, FaVimeoV, FaWifi } from "react-icons/fa";
import { TbAbc } from "react-icons/tb";
import { HiOutlineHome, HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineAudio, AiOutlineUser } from "react-icons/ai";
import { GiTeacher } from "react-icons/gi";
import { RiMiniProgramFill } from "react-icons/ri";

function About() {
  return (
    <>
      <EnrollTopNav />
      <Header />
      
      <div>
      <Container fluid className="px-0 pb-5 mb-5">
        <div className="about_image">
          <div
            className="d-flex justify-content-center h-100 align-items-center"
            style={{ position: "relative", zIndex: "99", color: "white" }}
          >
            {" "}
            <h4>About Our Disha Pre-School</h4>
          </div>
        </div>
      </Container>
      <Container style={{ marginTop: "120px" }}>
        <Row className="g-4 px-5">
          <Col md={6} lg={3}>
            <div className="d-flex flex-column ">
              <div className="d-flex justify-content-center">
              <div className="iconbg"><FaSchool className="icon1" /></div></div>

              <div className="d-flex justify-content-center">
                <span className="textcen my-3
                ">Active Learning</span>
              </div>

              <div className="d-flex justify-content-center">
                <span className="textcen">Active learning is one of the Characteristics of Effective Learning (CoEL) set out for early years children.</span>
                </div>

            </div>
          </Col>
          <Col md={6} lg={3}>
          <div className="d-flex flex-column ">
              <div className="d-flex justify-content-center">
              <div className="iconbg"><GiTeacher className="icon1" /></div></div>

              <div className="d-flex justify-content-center">
                <span className="textcen my-3
                ">Expert Teachers</span>
              </div>

              <div className="d-flex justify-content-center">
                <span className="textcen">An expert teacher listens to students and asks questions to help them make sense of their own understanding of key ideas.</span>
                </div>

            </div>
          </Col>
          <Col md={6} lg={3}>
          <div className="d-flex flex-column ">
              <div className="d-flex justify-content-center">
              <div className="iconbg"><HiOutlineLocationMarker className="icon1" /></div></div>

              <div className="d-flex justify-content-center">
                <span className="textcen my-3
                ">Strategi Location</span>
              </div>

              <div className="d-flex justify-content-center">
                <span className="textcen">A good school location fulfils certain criteria as well connected roads, fortified spot, allocated away from hustle and bustle and is sheltered</span>
                </div>

            </div>
          </Col>
          <Col md={6} lg={3}>
          <div className="d-flex flex-column ">
              <div className="d-flex justify-content-center">
              <div className="iconbg"><RiMiniProgramFill className="icon1" /></div></div>

              <div className="d-flex justify-content-center">
                <span className="textcen my-3
                ">Full Day Programs</span>
              </div>

              <div className="d-flex justify-content-center">
                <span className="textcen">We offer a full-day, year-round early childhood education program for children aged  5 ½ years old</span>
                </div>

            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="mt-5 pt-5 px-0">
        <div className="about_image" style={{ height: '650px' }}>
          <Container className="d-flex align-items-center h-100 px-5" style={{ position: "relative", zIndex: 99 }}>
            <div>
              <Row className="py-sm-5 h-100">
                <Col className="mb-md-5" height="100%" md={12} lg={6}>
                  <div className="" height="100%">
                    <img src={about1} alt="" className="w-100 rounded" height="100%" />
                  </div>
                </Col>
                <Col md={12} lg={6} className="pt-2">
                  <div className="">
                    <h2 className="pb-2">About Our Disha Pre-School</h2>
                    <p style={{ lineHeight: '' }}>Enthusiasticay diseminate competitive oportunitie through transparent an actions Compelngly seize viral schemas through intermandated creative is adiea sources. Enthusiasticay plagiarize clientcentered relationship for the covalent experiences. Distinctively architect 24/365 service for wireless is ebusiness ahosfluorescently Efficiently comunicate coperative methods of empowerment awesome athrough Monotonectaly myocardinate cross and functional niche markets and an functional.</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Container>

      <Container className="my-5 py-5">
        <div className="text-center">
          <h2>Why Choose Disha Pre-School</h2>
          <p className="text-secondary">Rapidiously expedite granular imperatives before economically sound web services. Credibly actualize pandemic strategic themeplatform.</p>
        </div>
        <Row>
          <Col md={4}>
            <div className="d-flex pt-4">
              <div className="text-end pe-3">
                <h4 className="text-warning">Expert Teachers</h4>
                <p className="text-secondary">Distinctively enhance empowered and alignments without leveraged architectures professionly.</p>
              </div>
              <div>
                <span className="fs-1 rounded-circle px-3 pb-3 bg-warning text-white"><AiOutlineUser /></span>
              </div>
            </div>
            <div className="d-flex pt-4">
              <div className="text-end pe-3">
                <h4 className="" style={{ color: '#fc7f0c' }}>Multimedia Class</h4>
                <p className="text-secondary">Distinctively enhance empowered and alignments without leveraged architectures professionly.</p>
              </div>
              <div>
                <span className="fs-1 rounded-circle px-3 pb-3 text-white" style={{ backgroundColor: '#fc7f0c' }}><TbAbc /></span>
              </div>
            </div>
            <div className="d-flex pt-4">
              <div className="text-end pe-3">
                <h4 className="" style={{ color: '#0fbaf4' }}>Music And Art Class</h4>
                <p className="text-secondary">Distinctively enhance empowered and alignments without leveraged architectures professionly.</p>
              </div>
              <div>
                <span className="fs-1 rounded-circle px-3 pb-3 text-white" style={{ backgroundColor: '#0fbaf4' }}><AiOutlineAudio /></span>
              </div>
            </div>
          </Col>
          <Col className="" md={4}>
            <div>
              <img src={about2} className='h-100 w-100' alt="" />
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex pt-4">
              <div>
                <span className="fs-1 rounded-circle px-3 pb-3 text-white" style={{ backgroundColor: '#e84b3a' }}><HiOutlineHome /></span>
              </div>
              <div className=" ps-3">
                <h4 className="" style={{ color: '#e84b3a' }}>Expert Teachers</h4>
                <p className="text-secondary">Distinctively enhance empowered and alignments without leveraged architectures professionly.</p>
              </div>
            </div>
            <div className="d-flex pt-4">
              <div>
                <span className="fs-1 rounded-circle px-3 pb-3 text-white" style={{ backgroundColor: '#92278f' }}><TbAbc /></span>
              </div>
              <div className="ps-3">
                <h4 className="" style={{ color: '#92278f' }}>Multimedia Class</h4>
                <p className="text-secondary">Distinctively enhance empowered and alignments without leveraged architectures professionly.</p>
              </div>
            </div>
            <div className="d-flex pt-4">
              <div>
                <span className="fs-1 rounded-circle px-3 pb-3 text-white" style={{ backgroundColor: '#ee257c' }}><AiOutlineAudio /></span>
              </div>
              <div className="ps-3">
                <h4 className="" style={{ color: '#ee257c' }}>Music And Art Class</h4>
                <p className="text-secondary">Distinctively enhance empowered and alignments without leveraged architectures professionly.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="px-0">
      <div className="teachersSection pb-5">
       <Container>
       <div style={{ position: "relative", zIndex: 99 }}>
       <div className="py-5 text-center">
          <h2 className="py-3">Meet Our Teachers</h2>
          <p>Rapidiously expedite granular imperatives before economically sound web services. Credibly actualize pandemic strategic themeplatform.</p>
        </div>
        <div>
          <Row className="gy-4">
            <Col md={6}>
              <Row className="g-0">
                <Col md={5}>
                  <div>
                    <img src={teacher1} className='h-100 w-100' alt="" />
                  </div>
                </Col>
                <Col md={7}>
                  <div className="h-100 px-3 py-4" style={{backgroundColor:'#92278f'}}>
                    <h4 className="pt-1">Broklyn Doel <small className="fs-6">Sains Teacher</small></h4>
                    <span role='button' className="pt-2"><FaFacebookF className="me-3"/> <FaVimeoV className="me-3"/> <FaTwitter className="me-3"/> <FaPinterest className="me-3"/> <FaWifi/></span>
                    <p className="pt-4">Distinctively initiate and sustainable synergy vaan tactical opportunities. awesome theme ollaboratively.</p>
                    <span className="fw-bold pt-2" style={{fontSize:'16px'}} role='button'>View Portfolio</span>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row className="g-0">
                <Col md={5}>
                  <div>
                    <img src={teacher2} className='h-100 w-100' alt="" />
                  </div>
                </Col>
                <Col md={7}>
                  <div className="h-100 px-3 py-4" style={{backgroundColor:'#e84b3a'}}>
                    <h4 className="pt-1">Alex Jhonson <small className="fs-6">Art Teacher</small></h4>
                    <span role='button' className="pt-2"><FaFacebookF className="me-3"/> <FaVimeoV className="me-3"/> <FaTwitter className="me-3"/> <FaPinterest className="me-3"/> <FaWifi/></span>
                    <p className="pt-4">Distinctively initiate and sustainable synergy vaan tactical opportunities. awesome theme ollaboratively.</p>
                    <span className="fw-bold pt-2" style={{fontSize:'16px'}} role='button'>View Portfolio</span>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row className="g-0">
                <Col md={5}>
                  <div>
                    <img src={teacher3} className='h-100 w-100' alt="" />
                  </div>
                </Col>
                <Col md={7}>
                  <div className="h-100 px-3 py-4" style={{backgroundColor:'#fc7f0c'}}>
                    <h4 className="pt-1">Robot Jhonson  <small className="fs-6">Math Teacher</small></h4>
                    <span className="pt-2" role='button'><FaFacebookF className="me-3"/> <FaVimeoV className="me-3"/> <FaTwitter className="me-3"/> <FaPinterest className="me-3"/> <FaWifi/></span>
                    <p className="pt-4">Distinctively initiate and sustainable synergy vaan tactical opportunities. awesome theme ollaboratively.</p>
                    <span className="fw-bold pt-2" style={{fontSize:'16px'}} role='button'>View Portfolio</span>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row className="g-0">
                <Col md={5}>
                  <div>
                    <img src={teacher4} className='h-100 w-100' alt="" />
                  </div>
                </Col>
                <Col md={7}>
                  <div className="h-100 px-3 py-4" style={{backgroundColor:'#0fbaf4'}}>
                    <h4 className="pt-1">Janaton Doe <small className="fs-6">English Teacher</small></h4>
                    <span role='button' className="pt-2"><FaFacebookF className="me-3"/> <FaVimeoV className="me-3"/> <FaTwitter className="me-3"/> <FaPinterest className="me-3"/> <FaWifi/></span>
                    <p className="pt-4">Distinctively initiate and sustainable synergy vaan tactical opportunities. awesome theme ollaboratively.</p>
                    <span className="fw-bold pt-2" style={{fontSize:'16px'}} role='button'>View Portfolio</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
       </div>
       </Container>
        </div>
      </Container>
    </div>
    <Footer />
    </>
  );
}

export default About;
