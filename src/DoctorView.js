import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Card, Table, Spinner, Container, Col } from "react-bootstrap";

function DoctorView(props)
{
    const web3React = useWeb3React();
    const [data, setData] = useState(undefined);

    useEffect(()=> {
        if(web3React.account) {
            fetch(`${process.env.REACT_APP_API_URL}/doctor?` + new URLSearchParams({
                requester: web3React.account
            }))
                .then(response => response.json())
                .then(data => setData(data));
        }
    }, [web3React.account]);

    if(data !== undefined && data.length > 0) {
        return(
            <Container>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Patients of {data[0].therapist}</Card.Title>
                        </Card.Body>
                    </Card>
                        <Table striped bordered hover >
                            <thead >
                                <tr>
                                    <th style={{fontWeight : "normal"}}>Id</th>
                                    <th style={{fontWeight : "normal"}}>First name</th>
                                    <th style={{fontWeight : "normal"}}>Last name</th>
                                    <th style={{fontWeight : "normal"}}>Gender</th>
                                    <th style={{fontWeight : "normal"}}>Birth date</th>
                                    <th style={{fontWeight : "normal"}}>Diagnose</th>
                                    <th style={{fontWeight : "normal"}}>Addiction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(patient=>
                                        (
                                            <tr key={patient.id}>
                                                <th style={{fontWeight : "normal"}}>{patient.id}</th>
                                                <th style={{fontWeight : "normal"}}>{patient.first_name}</th>
                                                <th style={{fontWeight : "normal"}}>{patient.last_name}</th>
                                                <th style={{fontWeight : "normal"}}>{patient.gender}</th>
                                                <th style={{fontWeight : "normal"}}>{new Date(patient.birthdate).toLocaleDateString()}</th>
                                                <th style={{fontWeight : "normal"}}>{patient.diagnose}</th>
                                                <th style={{fontWeight : "normal"}}>{
                                                    !patient.permission ? 
                                                        <i style={{color: "red"}}>Patient didn't share</i> : 
                                                        (patient.addiction === "") ? 
                                                        "No addiction" : 
                                                        patient.addiction
                                                    }</th>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                </Col>
            </Container>
        );
    } else {
        return(
            <Card>
                <Card.Body >
                    <Card.Text>
                        Loading Your Data... <Spinner animation="border" size="sm"/>
                    </Card.Text>
                </Card.Body>
            </Card>  
        );
    }
}

export default DoctorView;
