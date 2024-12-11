import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { getActivityPhoto } from "../../Redux/Actions/activityAction";
// import bgofimg from "./image/bgofimg.png";

const HomeActivity = () => {
  const activityImages  = useSelector((state) => state.activityImages.activityImages);
    console.log(activityImages)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivityPhoto());
  }, []);

  return (
    <>
    <Header />
    <div style={{ background: "white" }}>
      <div>
        <h4 className="my-5 pt-5 mb-3 section_heading text-center">
          Classroom-Activity
        </h4>
        <Container className="my-4">
          <Row className="d-flex">
            {activityImages?.map((x) => { 
              
              return (
                <>
                  {x.type === "classroom" && (
                    <Col md={4} className="mb-3 hover14">
                      <Card className="shadow-lg"
                        style={{ border: "none" }}>
                        <div className="bgimage">
                          <figure>
                            <Card.Img
                              variant="top"
                              src={`/activity-Photo/${x.image}`}
                              alt=""
                              height="400px"
                              style={{
                                borderRadius: "6px",
                                padding: "20px 20px 20px 20px",
                              }}
                            />
                          </figure>
                          <Card.Text
                            style={{
                              textAlign: "center",
                              color: "#696767",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                            className="pb-5"
                          >
                            {x.name}
                          </Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
                </>
              );
            })}
          </Row>
        </Container>
      </div>

      {/* <img className="bgimg1"></img> */}
 
{/* //playground */}
<div>
        <h4 className="my-5 pt-5 mb-3 section_heading text-center">
          Playground-Activity
        </h4>
        <Container className="my-4">
          <Row className="d-flex">
            {activityImages?.map((x) => {
              return (
                <>
                  {x.type === "playground" && (
                    <Col md={4} className="mb-3 hover14">
                      <Card className="shadow-lg"
                        style={{ border: "none" }}>
                        <div className="bgimage">
                          <figure>
                            <Card.Img
                              variant="top"
                              src={`/activity-Photo/${x.image}`}
                              alt=""
                              height="400px"
                              style={{
                                borderRadius: "6px",
                                padding: "20px 20px 20px 20px",
                              }}
                            />
                          </figure>
                          <Card.Text
                            style={{
                              textAlign: "center",
                              color: "#696767",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                            className="pb-5"
                          >
                            {x.name}
                          </Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
                </>
              );
            })}
          </Row>
        </Container>
      </div>

      {/* picnic */}
      <div>
        <h4 className="my-5 pt-5 mb-3 section_heading text-center">
          Picnic-Gallary
        </h4>
        <Container className="my-4">
          <Row className="d-flex">
            {activityImages?.map((x) => {
              return (
                <>
                  {x.type === "picnic" && (
                    <Col md={4} className="mb-3 hover14">
                      <Card className="shadow-lg"
                        style={{ border: "none" }}>
                        <div className="bgimage">
                          <figure>
                            <Card.Img
                              variant="top"
                              src={`/activity-Photo/${x.image}`}
                              alt=""
                              height="400px"
                              style={{
                                borderRadius: "6px",
                                padding: "20px 20px 20px 20px",
                              }}
                            />
                          </figure>
                          <Card.Text
                            style={{
                              textAlign: "center",
                              color: "#696767",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                            className="pb-5"
                          >
                            {x.name}
                          </Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
                </>
              );
            })}
          </Row>
        </Container>
      </div>

      {/* Parents */}
      <div>
        <h4 className="my-5 pt-5 mb-3 section_heading text-center">
         Parents Meeting
        </h4>
        <Container className="my-4">
          <Row className="d-flex">
            {activityImages?.map((x) => {
              return (
                <>
                  {x.type === "parents-meeting" && (
                    <Col md={4} className="mb-3 hover14">
                      <Card className="shadow-lg"
                        style={{ border: "none" }}>
                        <div className="bgimage">
                          <figure>
                            <Card.Img
                              variant="top"
                              src={`/activity-Photo/${x.image}`}
                              alt=""
                              height="400px"
                              style={{
                                borderRadius: "6px",
                                padding: "20px 20px 20px 20px",
                              }}
                            />
                          </figure>
                          <Card.Text
                            style={{
                              textAlign: "center",
                              color: "#696767",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                            className="pb-5"
                          >
                            {x.name}
                          </Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
                </>
              );
            })}
          </Row>
        </Container>
      </div>

      {/* annual */}

      <div>
        <h4 className="my-5 pt-5 mb-3 section_heading text-center">
         Annual Function
        </h4>
        <Container className="my-4">
          <Row className="d-flex">
            {activityImages?.map((x) => {
              return (
                <>
                  {x.type === "annual" && (
                    <Col md={4} className="mb-3 hover14">
                      <Card className="shadow-lg"
                        style={{ border: "none" }}>
                        <div className="bgimage">
                          <figure>
                            <Card.Img
                              variant="top"
                              src={`/activity-Photo/${x.image}`}
                              alt=""
                              height="400px"
                              style={{
                                borderRadius: "6px",
                                padding: "20px 20px 20px 20px",
                              }}
                            />
                          </figure>
                          <Card.Text
                            style={{
                              textAlign: "center",
                              color: "#696767",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                            className="pb-5"
                          >
                            {x.name}
                          </Card.Text>
                        </div>
                      </Card>
                    </Col>
                  )}
                </>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default HomeActivity;
