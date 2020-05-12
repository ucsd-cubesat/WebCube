import React, { Component } from 'react';
import { Header, Button, Icon } from 'semantic-ui-react';

function Error404Page() {
    return (
        <div className="ui center aligned container">
            <Header style={{
                "font-size":"10em",
                "background":"-webkit-linear-gradient(#eee, #555)",
                "-webkit-background-clip":"text",
                "-webkit-text-fill-color":"transparent"}}>
                404
            </Header>
            <p style={{"font-size": "1.5em"}}>Oops! That page doesn't exist. :(</p>
            <br/>
            <Button inverted onClick={() => window.history.back()}><Icon name='chevron left'/>Back</Button>
        </div>
    );
}

export default Error404Page;