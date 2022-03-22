import { Component } from 'react';

export class NodeService2 extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    getTreeTableNodes(course, exam) {
        let path2 = "data/" + course + exam + ".json";
        console.log(path2);
        return fetch(path2).then(res => res.json())
                .then(d => d.root);
    }

    getTreeNodes() {
        return fetch('data/treenodes.json').then(res => res.json())
                .then(d => d.root);
    }
}
    