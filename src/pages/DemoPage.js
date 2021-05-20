import React, { Component } from 'react';
import axios from "axios";

class DemoPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.updateData()
    }

    componentWillUnmount() {
    }

    updateData() {
        axios.get("http://localhost:8080/launchapi/db", {
            params: {
                utc: 1620011906531
            }
        }).then(response => {
            console.log(response.data)
            this.setState({
                data: response.data
            })
        })
    }

    render() {
        return (
            <div className="ui left aligned container">
                <p style={{"fontSize": "1.5em"}}>{this.state.data}</p>
            </div>
        );
    }
}

export default DemoPage;