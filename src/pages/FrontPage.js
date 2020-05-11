import React, { Component } from 'react';
import { Divider, Image } from 'semantic-ui-react';

function FrontPage() {
    return (
        <div className="ui center aligned container" >
            <Image size="medium" centered={true} src="../logo.svg"/>
        </div>
    );
}

export default FrontPage;