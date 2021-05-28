import React, {useCallback, useEffect, useRef} from "react";
import {extend, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

extend({OrbitControls})

const Camera = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls class.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls

    const {
        camera,
        gl: { domElement },
    } = useThree();

    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    const onWheel = useCallback((e, value) => {
        e.stopPropagation()
    }, [])

    // @ts-ignore
    useFrame((state) => controls.current.update());

    return (
        // @ts-ignore
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={true}
            onWheel={onWheel}
        />
    );
};

export default Camera