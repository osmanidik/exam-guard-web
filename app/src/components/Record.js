import '../App.css';
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';

export default class Record extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };


    }

    render() {
        return (
            <div className='GridCont'>
                <Container fluid>
                    <Row debug style={{height:"35vmin"}}>
                        <Col debug >Video</Col>
                        <Col debug >Seçilen Foto</Col>
                    </Row>
                    <br></br>
                    <Row debug style={{height:"35vmin"}}>
                        <Col debug >Riskli Anlar Listesi</Col>
                        <Col debug>Menü</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
                 