import { useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { PatientConsent } from 'patient-consent-contract/typechain/PatientConsent';
import { utils } from 'ethers';

interface AdminViewProps {
    contract: PatientConsent;
}

function AdminView(props: AdminViewProps) {

    const {contract} = props;

    const [address, setAddress] = useState<string>();

    const [role, setRole] = useState<string>();
    const [roleError, setRoleError] = useState<string>();

    function changeRole(e: any) {
        e.preventDefault();
        setRoleError("");
        if(address !== undefined && utils.isAddress(address)) {
            if(role === "admin") {
                contract.setAdmin(address); 
            } else if (role === "doctor") {
                contract.setDoctor(address);
            } else if (role === "client") {
                contract.setClient(address);
            } else {
                setRoleError("Role is not chosen"); 
            }
        } else {
            setRoleError("Incorrect address");
        }
    }

    const [id, setId] = useState<string>();
    const [addError, setAddError] = useState<string>();

    function addClient(e: any) {
        e.preventDefault();
        setAddError("");
        if(address !== undefined && utils.isAddress(address)) {
            if(!isNaN(Number(id))) {
                const _id = Number(id);
                // Hardcoded value for example data
                if(_id >= 1 && _id <= 1000) {
                    contract.addClient(address, _id);
                } else {
                    setAddError("ID should be in range 1-1000");
                }
            } else {
                setAddError("ID should be a number");
            }
        } else {
            setAddError("Incorrect address"); 
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="wallet">
                            <Form.Label>Public key of ethereum wallet</Form.Label>
                            <Form.Control type="text" placeholder="0x000...000" value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                        </Form.Group>
                        <hr/>
                        <Form.Group controlId="changeRole">
                            <Form.Label>New group for that user</Form.Label>
                            <Form.Control value={role} onChange={(e) => setRole(e.target.value)} as="select">
                                <option>Select...</option>
                                <option value="admin">Admin</option>
                                <option value="doctor">Doctor</option>
                                <option value="client">Client</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button onClick={changeRole}>Change role</Button>
                        </Form.Group>
                        <p style={{color: "red"}}>{roleError}</p>
                        <hr/>
                        <Form.Group controlId="addUser">
                            <Form.Label>User ID from DB</Form.Label>
                            <Form.Control type="text" placeholder="1-1000" value={id} onChange={(e) => setId(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button onClick={addClient} type="input">Add client to contract</Button>
                        </Form.Group>
                        <p style={{color: "red"}}>{addError}</p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminView;
