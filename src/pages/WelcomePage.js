import React, { Component } from 'react';
import { Divider, Image } from 'semantic-ui-react';

function WelcomePage() {
    return (
        <div className="ui center aligned container">
            <Image size="medium" centered={true} src="../TritonCubed_Logo_White_RevB.png"/>
        </div>
    );
}

export default WelcomePage;