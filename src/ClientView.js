import {useState, useEffect} from 'react';
import {Card, Container, Col, Row, Button, Spinner} from 'react-bootstrap';
import {useWeb3React} from '@web3-react/core';

function ClientView(props) {
    const {contract} = props;
    const web3React = useWeb3React();

    const [patient, setPatient] = useState(null);
    const [image_source, setImgSrc] = useState("");

    function loadPatient() {
        if(web3React.account) {
            fetch(`${process.env.REACT_APP_API_URL}/client?` + new URLSearchParams({
                requester: web3React.account, 
                client: web3React.account
            }))
                .then(data => data.json())
                .then(patient => {
                    setPatient(patient);
                    console.log(patient);
                });
        }
    }

    useEffect(loadPatient, [web3React.account, contract]);

    useEffect(()=> {
        if(patient) {
            patient.gender === "Male" ? setImgSrc("https://img.icons8.com/bubbles/100/000000/user.png") : setImgSrc("https://img.icons8.com/bubbles/100/000000/user-female.png");
        }
    }, [patient])

    const [pendingUpdate, setPendingUpdate] = useState(false);
    async function handleClick(e) {
        e.preventDefault();
        setPendingUpdate(true);
        contract.setPermission(!patient.permission)
            .then(()=>{loadPatient()})
            .finally(()=>{setPendingUpdate(false)});
    }

    if (!patient) {
        return (
            <Card>
                <Card.Body >
                    <Card.Text>
                        Loading Your Data... <Spinner animation="border" size="sm"/>
                    </Card.Text>
                </Card.Body>
            </Card>  
        );
    }
    else {
        return(
            <Container>
                <Row>
                    <Col>
                        <div className="page-content page-container">
                            <div className="padding">
                                <div className="row container d-flex justify-content-center">
                                    <div className="col-xl-12 col-md-8">
                                        <div className="card user-card-full">
                                            <div className="row m-l-0 m-r-0">
                                                <div className="col-sm-4 bg-info user-profile">
                                                    <div className="card-block text-center text-white">
                                                        <div className="m-b-25">                                  
                                                            <img src={image_source} alt="Gender" className="img-radius"/>                                                     
                                                        </div>
                                                        <h6 className="f-w-600">{patient.first_name} {patient.last_name}</h6>
                                                        <p>{patient.email}</p> 
                                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                        {pendingUpdate ? (
                                                            <Spinner animation="grow"/>
                                                        ) : (
                                                            <Button onClick={handleClick}>{patient.permission ? "Hide addiction" : "Show addiction"}</Button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-sm-8">
                                                    <div className="card-block">
                                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Email</p>
                                                                <h6 className="text-muted f-w-400">{patient.email}</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Full Name</p>
                                                                <h6 className="text-muted f-w-400">{patient.first_name} {patient.last_name}</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Gender</p>
                                                                <h6 className="text-muted f-w-400">{patient.gender}</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Birthdate</p>
                                                                <h6 className="text-muted f-w-400">{new Date(patient.birthdate).toLocaleDateString()}</h6>
                                                            </div>
                                                        </div>
                                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Diagnose</h6>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Recent</p>
                                                                <h6 className="text-muted f-w-400">{patient.diagnose}</h6>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Addiction</p>
                                                                <h6 className="text-muted f-w-400">
                                                                    {!patient.permission ? (
                                                                        <i style={{color: "red"}}>This field is hidden</i> 
                                                                    ) : patient.addiction === "" ? 
                                                                        "No addiction"
                                                                    : patient.addiction 
                                                                }</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ClientView;
