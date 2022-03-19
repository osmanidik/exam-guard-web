
import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            selectedNodeKey1: null,
            selectedNodeKey2: null,
            selectedNodeKeys1: [],
            selectedNodeKeys2: [],
            selectedNodeKeys3: []
        };

        this.nodeservice = new NodeService();
        this.onSelect = this.onSelect.bind(this);
        this.onUnselect = this.onUnselect.bind(this);
        this.rowClassName = this.rowClassName.bind(this);
    }

    onSelect(event) {
        if(event.node.data.parent !== "undefined"){
            this.toast.show({ severity: 'info', summary: 'Node Selected', detail: event.node.data.parent + " " +  event.node.data.name });
            console.log(event.node.data.name);
        }
    }

    onUnselect(event) {
        this.toast.show({ severity: 'info', summary: 'Node Unselected', detail: event.node.data.name });
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
                    <TreeTable value={this.state.nodes} rowClassName={this.rowClassName} selectionMode="single" selectionKeys={this.state.selectedNodeKey2} onSelectionChange={e => this.setState({ selectedNodeKey2: e.value })}
                        onSelect={this.onSelect} onUnselect={this.onUnselect}>
                        <Column field="name" header="Courses" expander></Column>
                    </TreeTable>
                </div>
            </div>
        )
    }
}
                 