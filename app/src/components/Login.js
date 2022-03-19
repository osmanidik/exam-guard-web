import '../App.css';
import React, { Component } from 'react';
import { Button } from 'primereact/button';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ""
        };
    }


    render() {
        return (
        <div className='login' style={{backgroundColor: "#fffafa"}}>
            <div className="card buttonLogin">
                <h3 style={{color: "black"}}>Welcome!</h3>
                <Button className='buttonClick' label="Click to login with Google" onClick={() => window.open("/home","_self")}/>
            </div>
        </div>

        )
    }
}
                 