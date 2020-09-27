import React, { Component } from 'react';
import { Divider, Image } from 'semantic-ui-react';

function WelcomePage() {
    return (
        <div>
            <div className="ui center aligned container">
                <Image size="medium" centered={true} src="../TritonCubed_Logo_White_RevB.png"/>
            </div>
            <div className="left aligned container" style={{margin: "5 em", "font-size": "50 px"}}>
                Welcome to our front page!
            </div>
        </div>
    );
}

export default WelcomePage;