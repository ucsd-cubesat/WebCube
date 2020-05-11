import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

function Error404Page() {
    return (
        <div className="ui center aligned container">
            <Header style={{"font-size": "10em"}}>404</Header>
            <p style={{"font-size": "1.5em"}}>Oops! That page doesn't exist. :(</p>
        </div>
    );
}

export default Error404Page;