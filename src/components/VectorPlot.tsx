// @see https://threejs.org/docs/#api/en/objects/Line
import React from 'react'
import * as THREE from 'three'
import {extend} from '@react-three/fiber'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

interface VectorPlotProps {
    x: number,
    y: number,
    z: number
}

extend({ DragControls })

function VectorPlot(props: VectorPlotProps): THREE.Line {
    const material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );
    points.push( new THREE.Vector3( - 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    return new THREE.Line( geometry, material );
}

export default VectorPlot