import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Resource from "./Resource";
import axios from "axios";

const HOST = "http://localhost:80";

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = { resources: [] };
  }
  componentWillMount() {
    var url = HOST + `/api/resources`;
    axios.get(url).then(response => {
      this.setState({ resources: response.data });
    });
  }
  render() {
    var { resources } = this.state;
    var renderResources = () => {
      if (resources.length === 0) {
        return <p>{resources}</p>;
      }
      return resources.map(resource => <Resource {...resource} />);
    };
    return (
      <div>
        <Header />
        <div class="container">
          <a
            href="#/dashboard/create-product"
            class="btn btn-success pull-right"
          >
            <i class="glyphicon glyphicon-plus" /> Add New Item
          </a>
          <br />
          <br />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>                
                <th />
              </tr>
            </thead>
            <tbody>{renderResources()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Resources;