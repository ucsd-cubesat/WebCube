import React, { Component } from 'react';
import axios from "axios";


// Servlet is accessible from localhost:8080/launchapi/db

let data;

axios.get("http://localhost:8080/launchapi/db", {
    params: {
        utc: 1620011906531
    }
}).then(response => {
    console.log(response.data)
    data = response.data
})

function DemoPage() {
    return (
        <div className="ui left aligned container">
            <p style={{"fontSize": "1.5em"}}>{data}</p>
        </div>
    );
}

export default DemoPage;