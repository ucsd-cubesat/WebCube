// @see https://threejs.org/docs/#api/en/objects/Line
import React from 'react'
import * as THREE from 'three'
import {azimuthalAngle, polarAngle} from "../util/Vector3Extensions";
import Camera from "./Camera";
import {Canvas} from "@react-three/fiber";

interface VectorPlotProps {
    x: number,
    y: number,
    z: number,
    title?: String
}

const size = 0.05

function VectorPlot(props: VectorPlotProps) {
    let sVector = new THREE.Vector3(props.x, props.y, props.z)

    let xMaterial = new THREE.MeshBasicMaterial({color: 'red'})
    let yMaterial = new THREE.MeshBasicMaterial({color: 'green'})
    let zMaterial = new THREE.MeshBasicMaterial({color: 'blue'})
    let sMaterial = new THREE.MeshBasicMaterial({color: 'yellow'})

    let xGeometry = new THREE.CylinderBufferGeometry(size, size, props.x)
        .rotateZ(Math.PI / 2)
        .translate(props.x / 2, 0, 0)

    let yGeometry = new THREE.CylinderBufferGeometry(size, size, props.y)
        .rotateX(Math.PI / 2)
        .translate(0, 0, props.y / 2)

    let zGeometry = new THREE.CylinderBufferGeometry(size, size, props.z)
        .translate(0, props.z / 2, 0)

    let sGeometry = new THREE.CylinderBufferGeometry(size, size, sVector.length())
        .rotateX(polarAngle(sVector))
        .rotateY((Math.PI / 2) - azimuthalAngle(sVector))
        .translate(props.x / 2, props.z / 2, props.y / 2)

    return (
        <>
            <Canvas style={{backgroundColor: '#666'}}>
                <mesh geometry={xGeometry} material={xMaterial}/>
                <mesh geometry={yGeometry} material={yMaterial}/>
                <mesh geometry={zGeometry} material={zMaterial}/>
                <mesh geometry={sGeometry} material={sMaterial}/>
                <Camera />
                <ambientLight intensity={1.0}/>
            </Canvas>
            <p style={{position: 'absolute', left: '0.75em', top: '0.50em', zIndex: 210,
                       color: 'white', fontSize: '13px', fontFamily: 'sans-serif'}}>
                {props.title}
            </p>
            <p style={{position: 'absolute', right: '0.75em', bottom: '0.50em', zIndex: 210,
                color: 'white', fontSize: '13px', fontFamily: 'monospace'}}>
                {Number(props.x).toFixed(2).padStart(7, "\u00a0")}
                {Number(props.y).toFixed(2).padStart(7, "\u00a0")}
                {Number(props.z).toFixed(2).padStart(7, "\u00a0")}
            </p>
        </>
    )
}

export default VectorPlot