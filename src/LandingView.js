import './LandingView.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, CardDeck, Card, Carousel } from 'react-bootstrap';
import { AiFillMail, AiFillPhone } from 'react-icons/ai';
import { GrOrganization } from 'react-icons/gr';

var sectionStyle = {
    backgroundImage: `url(/introDoctor1.jpeg)`
}

function LandingView() {
    return (
        <div className="LandingView">
            <Container className = 'IntroContainer' style={sectionStyle}>
                <Row className='Intro'> 
                    <Col sm={7} className ='Info' id="about">
                        <h4>Patient Data Control System</h4>
                        <p>We introduce you Web Application that allows patients of your clinic to obtain their up-to-date information in the most easiest and convenient way.
                            This Application is also extremely useful for medical personal so they always could be able to keep up with the latest patient information related to the particular worker.
                            You shouldn't worry at all regarding your or your patient's personal data because it is stored using one of the most modern and advanced technology called Blockchain. 
                            If you wish to know more about it welcome to the carousel just above this panel. And the most important fact is that all of these available at any time on your computer, tablet, or mobile!</p>
                    </Col>
                </Row>
            </Container>
            <br />
            <hr />
            <h3> A Little into Details </h3>
            <hr />
            <br />
            <Container className='BlockChainCarousel'>
                <Row>
                    <Col>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="BlockChainCarousel w-100"
                                    src= '../blockchain.png'
                                    alt="blockchain"
                                    width = "930px"
                                    height = "450px"
                                />
                                <Carousel.Caption>
                                    <h3>What is Blockchain</h3>
                                    <p>Blockchain is truly decentralized ledger (or write-only database) which doesn't rely on any sort of authority, instead it relies of algorithms</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="BlockChainCarousel w-100"
                                    src='../eth.jpg'
                                    alt="Ethereum"
                                    width = "930px"
                                    height = "450px"
                                />

                                <Carousel.Caption>
                                    <h3>Ethereum</h3>
                                    <p>Ethereum is a blockchain network created for computation. If generally we can assume that blockchain is database, then we could say that Ethereum is computer</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="BlockChainCarousel w-100"
                                    src='../secure.png'
                                    alt="Why is it Secure"
                                    width = "930px"
                                    height = "450px"
                                />

                                <Carousel.Caption>
                                    <h3>Something about our System/ Why is it Secure</h3>
                                    <p>Our system relies on smart-contract to store most sensitive information: user's consent for sharing any kind of data and log of access to data </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </Container>
            <br />
            <footer>
                <div>
                    <h4 id = "contact" >Warriors of The World</h4>
                </div>
                <Container fluid>
                    <Row>
                        <Col >
                            <CardDeck>
                                <Card>
                                    <Card.Header> Andrii Padalka</Card.Header>
                                    <Card.Body> 
                                        <Card.Text>
                                            <a href="mailto:apadalka@myseneca.ca"><AiFillMail /></a> Mail: apadalka@myseneca.ca
                                            <br />
                                            <a href="tel:+16479999999"><AiFillPhone /></a> Mobile Number: +1 (647) 999 99 99
                                            <br />
                                            <a href="https://www.senecacollege.ca/home.html"><a href="https://www.senecacollege.ca/home.html"><GrOrganization /></a></a> Organization: Seneca College
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header>Alexander Balandin</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <a href="mailto:abalandin@myseneca.ca"><AiFillMail /></a> Mail: abalandin@myseneca.ca
                                            <br />
                                            <a href="tel:+16477620430"><AiFillPhone /></a>Mobile Number: +1 (647) 762 04 30
                                            <br />
                                            <a href="https://www.senecacollege.ca/home.html"><GrOrganization /></a> Organization: Seneca College
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header>Daniil Sherstnev</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <a href="mailto:dsherstnev@myseneca.ca"><AiFillMail /></a> Mail: dsherstnev@myseneca.ca
                                            <br />
                                            <a href="tel:+16479134941"><AiFillPhone /></a> Mobile Number: +1 (647) 913 49 41
                                            <br />
                                            <a href="https://www.senecacollege.ca/home.html"><GrOrganization /></a> Organization: Seneca College
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header>German Malikov</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <a href="mailto:germalikov@gamil.com"><AiFillMail /></a> Mail: germalikov@gamil.com
                                            <br />
                                            <a href="tel:+16477832191"><AiFillPhone /></a> Mobile Number: +1 (647) 783 21 91
                                            <br />
                                            <a href="https://www.senecacollege.ca/home.html"><GrOrganization /></a> Organization: Seneca College
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header>Vladimir Romashchenko</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <a href="mailto:vromashchenko@myseneca.ca"><AiFillMail /></a> Mail: vromashchenko@myseneca.ca
                                            <br />
                                            <a href="tel:+14168549728"><AiFillPhone /></a> Mobile Number: +1 (416) 854 97 28
                                            <br />
                                            <a href="https://www.senecacollege.ca/home.html"><GrOrganization /></a> Organization: Seneca College
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </CardDeck>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default LandingView;
