import React, { Component } from 'react';
import axios from "axios";

import {Button, Dimmer, Loader, Popup} from 'semantic-ui-react'
import {Map, Point, Overlay} from 'pigeon-maps'
// @ts-ignore
import {LineChart} from 'react-chartkick'
import 'chartkick/chart.js'
import VectorPlot from "../components/VectorPlot";
import SimplePlaceholder from "../components/SimplePlaceholder";

interface Payload {
    utc: number
    accel_X: number
    accel_Y: number
    accel_Z: number
    gyro_X: number
    gyro_Y: number
    gyro_Z: number
    mag_X: number
    mag_Y: number
    mag_Z: number
    temp_C: number
    latitude: number
    longitude: number

    // Needed in the future
    altitude: number
}

interface DemoPageState {
    packets: Payload[]
    lastPacket?: Payload
    showTemp: boolean
    showAccel: boolean
    showGyro: boolean
    showMagneto: boolean
    autoFocus: boolean
}

class DemoPage extends Component<any, DemoPageState> {

    private interval?: NodeJS.Timeout

    constructor(props: any) {
        super(props);
        this.state = {
            packets: [],
            lastPacket: undefined,
            showTemp: true,
            showAccel: true,
            showGyro: true,
            showMagneto: true,
            autoFocus: true
        }
        this.scheduleRequest = this.scheduleRequest.bind(this)
        this.pushData = this.pushData.bind(this)
    }

    componentDidMount() {
        this.interval = setInterval(this.scheduleRequest, 2000);
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
        if (!this.state.lastPacket || this.state.lastPacket.utc !== packet.utc) {
            let packets = [...this.state.packets, packet];
            if (packets.length > 10) packets.shift();
            this.setState({
                packets: packets,
                lastPacket: packet
            })
        }
    }

    render() {
        const {packets, lastPacket, showAccel, showGyro, showTemp, showMagneto, autoFocus} = this.state
        const center: (Point | undefined) = lastPacket && autoFocus ? [lastPacket.latitude, lastPacket.longitude] : undefined
        const status = lastPacket ? "Logged time: " + new Date(lastPacket.utc).toUTCString() : "(no data)"

        const markers = packets.map((e, i) => {
            const {width, color} = (i === packets.length - 1) ? {width: 40, color: "rgb(229,44,44)"} :
                                                                {width: 24, color: "rgb(103,123,246)"}
            const anchor: Point = [e.latitude, e.longitude];
            const mark = <svg width={width} height={width}>
                <circle cx={width / 2} cy={width / 2} r={width / 2} fill={color}/>
                <circle cx={width / 2} cy={width / 2} r={width / 4} fill={'rgba(0,0,0,0.2)'}/>
            </svg>
            return <Overlay key={"mark_"+e.utc} anchor={anchor} offset={[width / 2, width / 2]}>
                <Popup trigger={mark} content={anchor.toString()} style={{fontFamily: 'monospace'}}/>
            </Overlay>
        })

        const tempData: any = {}
        packets.forEach(e => {
            let date = new Date(e.utc);
            tempData[date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()] = e.temp_C
        })

        return (
            <div style={{backgroundColor: 'black', height: '93.4%', width: '100%'}}>
                <div style={{height: '95.2%', position: 'relative'}}>
                    <div style={{position: 'absolute', width: '100%', height: '100%', zIndex: 50}}>
                        <Dimmer active={packets.length === 0}>
                            <Loader size={"huge"}>Loading...</Loader>
                        </Dimmer>
                        <Map center={center} defaultZoom={13}>
                            {markers}
                        </Map>
                    </div>

                    {showTemp && <div style={{
                        position: 'absolute', zIndex: 100, backgroundColor: '#eee',
                        top: '1em', left: '1em', width: '25em', height: '20em',
                    }}> {
                        packets.length > 0 ?
                            <LineChart data={tempData} title={"temperature"} height={'100%'} suffix={'°C'} colors={['red']}/>
                            : <SimplePlaceholder/>
                    }
                    </div>}

                    {showAccel && <div style={{position: 'absolute', zIndex: 200,
                        top: '1em', right: '1em', width: '15em', height: '15em'}}> {
                        lastPacket ? <VectorPlot x={lastPacket.accel_X} y={lastPacket.accel_Y} z={lastPacket.accel_Z} title={"Accelerometer (m/s^2)"} />
                            : <SimplePlaceholder />
                    }
                    </div>}

                    {showGyro && <div style={{position: 'absolute', zIndex: 200,
                        top: '17em', right: '1em', width: '15em', height: '15em'}}> {
                        lastPacket ? <VectorPlot x={lastPacket.gyro_X} y={lastPacket.gyro_Y} z={lastPacket.gyro_Z} title={"Gyroscope (deg/s)"}/>
                            : <SimplePlaceholder/>
                    }
                    </div>}

                    {showMagneto && <div style={{position: 'absolute', zIndex: 200,
                        top: '33em', right: '1em', width: '15em', height: '15em'}}> {
                        lastPacket ? <VectorPlot x={lastPacket.mag_X} y={lastPacket.mag_Y} z={lastPacket.mag_Z} title={"Magnetosensor (guass)"}/>
                            : <SimplePlaceholder/>
                    }
                    </div>}
                </div>
                <div style={{padding: '0.5em', position: 'relative'}}>
                    <p style={{position: 'absolute', marginTop: '0.3em', fontFamily: 'monospace'}}>{status}</p>

                    <Button id={'tempButton'} inverted floated={'right'} size={'mini'} content={'Temp'} active={showTemp}
                            onClick={() => {this.setState({showTemp: !showTemp}); document.getElementById('tempButton')?.blur()}}/>

                    <Button id={'accelButton'} inverted floated={'right'} size={'mini'} content={'Accel'} active={showAccel}
                            onClick={() => {this.setState({showAccel: !showAccel}); document.getElementById('accelButton')?.blur()}}/>

                    <Button id={'gyroButton'} inverted floated={'right'} size={'mini'} content={'Gyro'} active={showGyro}
                            onClick={() => {this.setState({showGyro: !showGyro}); document.getElementById('gyroButton')?.blur()}}/>

                    <Button id={'magnetoButton'} inverted floated={'right'} size={'mini'} content={'Magneto'} active={showMagneto}
                            onClick={() => {this.setState({showMagneto: !showMagneto}); document.getElementById('magnetoButton')?.blur()}}/>

                    <Button id={'autoFocusButton'} inverted floated={'right'} size={'mini'} content={'Auto Focus'} active={autoFocus}
                            onClick={() => {this.setState({autoFocus: !autoFocus}); document.getElementById('autoFocusButton')?.blur()}}/>
                </div>
            </div>
        );
    }
}

export default DemoPage;