import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Resource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""           
        };
    }

    componentDidMount() {
        this.setState({ name: this.props.ID });
        this.setState({ newName: this.props.ID });
    }
    
    render() {
        const {            
            name            
        } = this.state;
    
        return(<td>{name}</td>);
    }
}

export default Resource;