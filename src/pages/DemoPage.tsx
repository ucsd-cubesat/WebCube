import React, { Component } from 'react';
import axios from "axios";

import {Dimmer, Loader, Segment} from 'semantic-ui-react';
import {Map, Marker, Point} from 'pigeon-maps'

interface Payload {
    temp: number
    latitude: number
    longitude: number
    utc: number
}

interface DemoPageState {
    packets: Payload[]
    lastPacket?: Payload
}

class DemoPage extends Component<any, DemoPageState> {

    private interval?: NodeJS.Timeout

    constructor(props: any) {
        super(props);
        this.state = {
            packets: [],
            lastPacket: undefined
        }
        this.scheduleRequest = this.scheduleRequest.bind(this)
        this.pushData = this.pushData.bind(this)
    }

    componentDidMount() {
        this.interval = setInterval(this.scheduleRequest, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval!);
    }

    scheduleRequest() {
        axios.get("http://localhost:8080/launchapi/db")
            .then(response => response.data)
            .then(this.pushData)
    }

    pushData(packet: Payload) {
        if (packet !== this.state.lastPacket) {
            let packets = [...this.state.packets, packet];
            if (packets.length > 10) packets.shift();
            this.setState({
                packets: packets,
                lastPacket: packet
            })
        }
    }

    render() {
        const {packets, lastPacket} = this.state
        const center: (Point | undefined) = lastPacket ? [lastPacket.latitude, lastPacket.longitude] : undefined
        const lastFix = lastPacket ? new Date(lastPacket.utc).toString() : "Never"

        const markers = packets.map((e, i) => {
            const {width, color} = (i === packets.length - 1) ? {width: 40, color: "rgb(200, 100, 0)"} :
                                                                {width: 20, color: "rgb(0, 100, 200)"}
            return <Marker key={"marker_"+e.utc} width={width} color={color} anchor={[e.latitude, e.longitude]} />
        })

        return (
            <div style={{backgroundColor: 'black', height: '93.4%', width: '100%'}}>
                <Dimmer active={packets.length == 0}>
                    <Loader size={"huge"}>Loading...</Loader>
                </Dimmer>
                <div style={{
                    height: '96%'
                }}>
                    <Map center={center} defaultZoom={13}>
                        {markers}
                        <div style={{position: 'relative', zIndex: 100,
                                     top: '3em', left: '3em', width: '20em', height: '15em',
                                     backgroundColor: 'white', color: 'black'}}>
                        </div>
                    </Map>
                </div>
                <div style={{
                    padding: '0.5em'
                }}>
                    <p><b>Last fix: {lastFix}</b></p>
                </div>
            </div>
        );
    }
}

export default DemoPage;