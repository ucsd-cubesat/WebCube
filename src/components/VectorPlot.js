import React, { Component } from 'react';

class VectorPlot extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <canvas width={this.props.width} height={this.props.height} />
        )
    }
}

export default VectorPlot;