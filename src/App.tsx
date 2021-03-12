import { useEffect, useState, FormEvent } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { providers, utils, Contract } from 'ethers';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Switch, Route, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { PatientConsent } from 'patient-consent-contract/typechain';
import PatientConsentAbi from 'patient-consent-contract/artifacts/contracts/PatientConsent.sol/PatientConsent.json';
import './App.css';
import LandingView from './LandingView';
import AdminView from './AdminView';
import DoctorView from './DoctorView';
import ClientView from './ClientView';
import NotFound from './NotFound';

function App() {
    const web3React = useWeb3React();
    const [contract, setContract] = useState<PatientConsent>();

    const history = useHistory();

    const [connecting, setConnecting] = useState<boolean>(false);

    function injectedConnect() {
        const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
        setConnecting(true);
        web3React.activate(injected);
        setConnecting(false);
    }

    function disconnect() {
        web3React.deactivate();
        history.push("/");
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(web3React.active) {
            disconnect();
        } else {
            injectedConnect();
        }
    }

    const [role, setRole] = useState<"admin"|"doctor"|"client">();
    useEffect(() => {
        if(web3React.account && contract) {
            contract.isClient(web3React.account).then(isClient => {if (isClient){setRole("client");}});
            contract.isDoctor(web3React.account).then(isDoctor => {if (isDoctor){setRole("doctor");}});
            contract.isAdmin(web3React.account).then(isAdmin => {if (isAdmin){setRole("admin");}});
        }
    }, [web3React.account, contract]);

    useEffect(() => {
        if(web3React.active) {
            const provider: providers.Web3Provider = web3React.library;
            const signer = provider.getSigner();
            const address = process.env.REACT_APP_CONTRACT_ADDRESS; 
            const abi = new utils.Interface(PatientConsentAbi.abi);
            if(address !== undefined) {
                setContract(new Contract(address, abi).connect(signer) as PatientConsent);
            }
        }
    }, [web3React.active, web3React.library]);


    return (
        <>
            <Navbar className='color-nav' expand="lg" sticky="top">
                <LinkContainer to="/">
                    <Navbar.Brand>Warriors of the World</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {web3React.active && (
                            <LinkContainer to="/profile">
                                <Nav.Link>Dashboard: {role}</Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                    <Form inline className='Button' onSubmit={handleSubmit}>
                        <Button variant="dark" type="submit" disabled={connecting}>
                            <img width='100px' alt='metaMaskIcon' src='../metaMaskIcon.png'></img>
                            {web3React.active ? "Logout" : "Login via MetaMask"}
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <br/>
            <Switch>
                <Route exact path="/" render={(props) => (
                    <LandingView/>
                )}/>
                <Route exact path="/profile" render={(props) => 
                    (contract) &&
                    (role === "admin") ? (
                        <AdminView contract={contract}/>
                    ) : (role === "doctor") ? (
                        <DoctorView contract={contract}/>
                    ) : (role === "client") ? (
                        <ClientView contract={contract}/>
                    ) : (
                        <NotFound/>
                    )
                }/>
                <Route render={(props) => (
                    <NotFound/>
                )}/>
            </Switch>
        </>
    );
}

export default App;
