import '../App.css';
import { Container, Row, Col } from 'react-grid-system';
import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';
import { NodeService2 } from '../service/NodeService2';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            selectedNodeKey: null,
            exam: "",
            course: ""
        };

        this.nodeservice = new NodeService();
        this.onSelect = this.onSelect.bind(this);
        this.rowClassName = this.rowClassName.bind(this);
    }

    onSelect(event) {
        let course = event.node.data.parent;
        let exam = event.node.data.name;
        this.toast.show({ severity: 'info', summary: 'Exam Selected', detail: course + " " +  exam });
        this.setState({exam: exam});
        this.setState({course: course})
    }

    componentDidMount() {
        this.nodeservice.getTreeTableNodes().then(data => this.setState({ nodes: data }));
    }

    rowClassName(node) {
        return { 'p-highlight': (!node.children) };
    }

    render() {
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <div className="card CourseTable">
                    <TreeTable value={this.state.nodes} 
                        rowClassName={this.rowClassName} 
                        selectionMode="single" 
                        selectionKeys={this.state.selectedNodeKey} 
                        onSelectionChange={e => this.setState({ selectedNodeKey: e.value })}
                        onSelect={this.onSelect}>
                        <Column field="name" header="Courses" expander></Column>
                    </TreeTable>
                </div>
                <div>
                    <Exam exam = {this.state.exam} course = {this.state.course}></Exam>
                </div>
            </div>
        )
    }
}

export class Exam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            selectedNodeKey: null,
            selectedRecord: ""
        };

        this.nodeservice2 = new NodeService2(this.props.exam);
        this.rowClassName = this.rowClassName.bind(this);
    }

    onSelect(event) {
        //window.open("/record", "_self")
        this.setState({selectedRecord: event});
    }


    componentDidUpdate() {
        this.nodeservice2.getTreeTableNodes(this.props.course, this.props.exam).then(data => this.setState({ nodes: data }));
    }

    rowClassName(node) {
        return { 'p-highlight': (!node.children) };
    }

    render() {
        return (
            <div>
                <h3>{this.props.course} {this.props.exam}</h3>
                <div className="card CourseTable">
                    <TreeTable value={this.state.nodes} 
                        rowClassName={this.rowClassName}
                        selectionMode="single" 
                        selectionKeys={this.state.selectedNodeKey} 
                        onSelectionChange={e => this.setState({ selectedNodeKey: e.value })}
                        onSelect={this.onSelect}>
                        <Column field="name" header="Students" expander></Column>
                    </TreeTable>
                </div>
                <div>
                    <Record record = {this.state.selectedRecord}></Record>
                </div>
            </div>
        )
    }
}
export class Record extends Component {

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