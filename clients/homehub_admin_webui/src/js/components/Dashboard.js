import React, { Component } from "react";
import Header from "./Header";
import io from "socket.io-client";
import axios from "axios";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";

const HOST = "http://localhost:80";
let socket = io.connect(HOST);
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: []
    };
    //this.handleSaveResource = this.handleSaveResource.bind(this);
  }
  componentDidUpdate() {    
  }
 
  // handleSaveResource = () => {
  //   const transaction = {
  //     date: moment().format("DD-MMM-YYYY HH:mm:ss"),
  //     total: this.state.total,
  //     items: this.state.items
  //   };
  //   axios.post(HOST + "/api/resources", resource).catch(err => {
  //     console.log(err);
  //   });
  // };
  render() {    
    return (
      <div>
        <Header />
      </div>
    );
  }
}
export default Dashboard;