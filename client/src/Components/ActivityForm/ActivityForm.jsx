import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { getActivityPhoto , addActivityPhoto, deleteActivity} from '../../Redux/Actions/activityAction';

function ActivityForm() {
    const dispatch = useDispatch();
    const activityImages  = useSelector((state) => state.activityImages.activityImages);

    useEffect(() => {
        dispatch(getActivityPhoto());
    }, []);

    const [activtyImage, setActivtyImage] = useState({
        name: "",
        type: "",
        image: ""
    })

    const getValues = (e) => {
        activtyImage[e.target.name] = e.target.value;
        setActivtyImage({ ...activtyImage })
    }

    const getPhoto = (e) => {

        setActivtyImage({ ...activtyImage, image: e.target.files })
    }

    const deleteActivityone = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this party!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteActivity(_id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        dispatch(addActivityPhoto(activtyImage))
    }


    return (
        <>
        <div className='blank_card'>
            <Container className=''>
                <Row className='d-flex justify-content-center align-items-center h-75' >
                    <Col md={4}>
                        <Form onSubmit={submitForm}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" name="name" onChange={getValues} />

                            </Form.Group>

                            <fieldset>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label as="legend" column sm={2}>
                                        Type
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="classroom"
                                            name="type"
                                            id="type1"
                                            value="classroom"
                                            onChange={getValues}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="playground"
                                            name="type"
                                            id="type2"
                                            value="playground"
                                            onChange={getValues}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Picnic"
                                            name="type"
                                            id="type3"
                                            value="picnic"
                                            onChange={getValues}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Parents-meeting"
                                            name="type"
                                            id="type4"
                                            value="parents-meeting"
                                            onChange={getValues}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Annual-Function"
                                            name="type"
                                            id="type4"
                                            value="annual"
                                            onChange={getValues}
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>

                            <Form.Group className="mb-3" controlId="image" onChange={getPhoto}>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>


                            <Button variant="danger" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
            <Container>
                <div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Type</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                activityImages.length > 0 && activityImages?.map((x) => {
                                    return (
                                        <tr>
                                            <td>{x.name}</td>
                                            <td>{x.type}</td>
                                            <td>
                                                <img src={`/activity-Photo/${x.image}`} alt="" height="100px"></img>
                                            </td>
                                            <td><Button onClick={() => { deleteActivityone(x._id) }}>Delete</Button></td>
                                            {/* <td><Button>Update</Button></td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>


                </div>
            </Container>
        </>
    )
}

export default ActivityForm