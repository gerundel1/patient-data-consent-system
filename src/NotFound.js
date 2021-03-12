import { Container, Col, Row } from 'react-bootstrap';

function NotFound()
{
    return(
        <Container>
            <Row> 
                <Col>
                    <h1>Not Found</h1>
                    <p>We can't find what you're looking for...</p>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound;

