import React, { useMemo, useCallback } from 'react'
import * as THREE from 'three'
import ReactDOM from 'react-dom'
import { Canvas, extend, useThree, useResource } from 'react-three-fiber'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import './styles.css'

extend({ DragControls })

function Scene() {
    const { camera, gl } = useThree()
    const [ref, object] = useResource()
    const points = useMemo(() => [new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 10, 0), new THREE.Vector3(10, 0, 0)], [])
    const onUpdate = useCallback(self => self.setFromPoints(points), [points])
    return (
        <>
            <line position={[0, -2.5, -10]} ref={ref}>
                <bufferGeometry attach="geometry" onUpdate={onUpdate} />
                <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
            </line>
            <dragControls args={[[object], camera, gl.domElement]} />
        </>
    )
}