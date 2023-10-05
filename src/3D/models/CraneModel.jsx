import { OrbitControls, Preload, Text, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from 'three'



export default function Case3Model(props){
    const {camera, canvas} = useThree()
    const [mobileTransition, setMobileTransition] = useState(0)
    const ref = useRef()
    const orbitControlsRef = useRef()
    const craneFull = useGLTF('/models/craneNEW.glb')
    // const craneFull = useGLTF('/models/craneFull3js.glb')

    useEffect(() => {
        for (let i = 0; i < craneFull.materials.length; i++) {
            const element = array[i];
            element.transparent = true
        }

        // SETKA
        craneFull.materials.MetalGrid.map.repeat.x = 5
        craneFull.materials.MetalGrid.map.repeat.y = 5
        craneFull.materials.MetalGrid.metalnessMap.repeat.x = 1
        craneFull.materials.MetalGrid.metalnessMap.repeat.y = 1
        craneFull.materials.MetalGrid.roughnessMap.repeat.x = 1
        craneFull.materials.MetalGrid.roughnessMap.repeat.y = 1
        craneFull.materials.MetalGrid.map.wrapS = THREE.RepeatWrapping
        craneFull.materials.MetalGrid.map.wrapT = THREE.RepeatWrapping
        craneFull.materials.MetalGrid.metalnessMap.wrapS = THREE.RepeatWrapping
        craneFull.materials.MetalGrid.metalnessMap.wrapT = THREE.RepeatWrapping
        craneFull.materials.MetalGrid.roughnessMap.wrapS = THREE.RepeatWrapping
        craneFull.materials.MetalGrid.roughnessMap.wrapT = THREE.RepeatWrapping
    
        // STONE
        craneFull.materials.Concrete.map.repeat.x = 20
        craneFull.materials.Concrete.map.repeat.y = 20
        craneFull.materials.Concrete.metalnessMap.repeat.x = 20
        craneFull.materials.Concrete.metalnessMap.repeat.y = 20
        craneFull.materials.Concrete.roughnessMap.repeat.x = 20
        craneFull.materials.Concrete.roughnessMap.repeat.y = 20
        craneFull.materials.Concrete.map.wrapS = THREE.RepeatWrapping
        craneFull.materials.Concrete.map.wrapT = THREE.RepeatWrapping
        craneFull.materials.Concrete.metalnessMap.wrapS = THREE.RepeatWrapping
        craneFull.materials.Concrete.metalnessMap.wrapT = THREE.RepeatWrapping
        craneFull.materials.Concrete.roughnessMap.wrapS = THREE.RepeatWrapping
        craneFull.materials.Concrete.roughnessMap.wrapT = THREE.RepeatWrapping

        // LIGHTMATERIAL
        craneFull.materials.LightMaterial.emissive.r = 15
        craneFull.materials.LightMaterial.emissive.g = 0.3
        craneFull.materials.LightMaterial.emissive.b = 0
        craneFull.materials.LightMaterial.emissiveIntensity = 5
        craneFull.materials.LightMaterial.color.r = 5
        craneFull.materials.LightMaterial.color.g = 4
        craneFull.materials.LightMaterial.color.b = 4
        craneFull.materials.LightMaterial.toneMapped = false

        // GLASS
        craneFull.materials.Cristal.transparent = true
        craneFull.materials.Cristal.opacity = 0.7

        props.setCraneRendered(true)
    }, [])

    useEffect(()=>{
        if (props.activatedMainPage === true) {
            camera.position.x = 0
            camera.position.y = 5
            // camera.position.y = 5
            if (window.innerWidth > 768) {
                camera.position.z = ((window.innerWidth - 768) / (1920 - 768)) * (6 - 8) + 8;
            }
            if (window.innerWidth <= 768) {
                camera.position.z = 6
            }
            if (window.innerWidth > 768) {
                ref.current.position.z = 0
                ref.current.position.x = 8
            }
            if (window.innerWidth <= 768) {
                ref.current.position.z = -5
                ref.current.position.x = 5
            }
            ref.current.position.y = 0
            // ref.current.position.z = 0
            ref.current.rotation.y = 0
            camera.lookAt(0, camera.position.y, 0)
            setMobileTransition(0)
            ref.current.visible = true
        }
    },[props.activatedMainPage])

    const fontProps = {
        font: '/fonts/ManifoldExtended/ManifoldExtendedCF-Bold.woff',
        fontSize: 1,
        letterSpacing: 0.05,
        lineHeight: 1,
        'material-toneMapped': false,
    }


    useFrame((renderer, delta) => {
        if (props.activatedMainPage === true && ref.current != undefined) {     

            // DESKTOP VERSION 
            if (window.innerWidth > 768 && ref.current != null) {
                // Model animation
                easing.damp(ref.current.position, 'y', ((window.innerWidth - 768) / (1920 - 768) * (-33.5 - -13) + -13), 3, delta)

                easing.damp(ref.current.position, 'x', ((window.innerWidth - 768) / (1920 - 768) * (4 - 2) + 2), 1.2, delta)

                // easing.damp(ref.current.position, 'z', ((camera.position.x - 0) / (-14 - 0)) * (10 - 0) + 0, 0.5, delta)
                easing.damp(ref.current.position, 'z', ((camera.position.x - 0) / (-14 - 0)) * (((window.innerWidth - 768) / (1920 - 768) * (10 - 5) + 5) - 0) + 0, 0.5, delta)
                // ((window.innerWidth - 768) / (1920 - 768) * (10 - 5) + 5)

                if (ref.current.position.y <= -30) {
                    easing.damp(ref.current.rotation, 'y', 0.45,  2, delta)
                }
            }

            // Mobile version
            if (window.innerWidth <= 768 && ref.current != null) {
                if (mobileTransition === 0) {
                    easing.damp(ref.current.position, 'x', 2, 0.5, delta)
                    easing.damp(ref.current.position, 'y', -27.5, 1.5, delta)
                    easing.damp(ref.current.rotation, 'y', 0.65,  2, delta)
                    if (ref.current.position.y <= -25) {
                        if (mobileTransition === 0) {
                            setMobileTransition(1)
                        }
                    }
                }
                if (mobileTransition === 1) {
                    easing.damp(ref.current.position, 'x', 6, 1.5, delta)
                    easing.damp(ref.current.position, 'y', -27.5, 3, delta)
                    easing.damp(ref.current.position, 'z', -25,  2, delta)
                }

            }

        }
        if (props.activePage != '') {
            // Transition out
            easing.damp(ref.current.position, 'y', -70, 1, delta)
            if (ref.current.position.y >= 45) {
                ref.current.visible = false
            }
        }
    })

    return <>
    <OrbitControls ref={orbitControlsRef} 
        minAzimuthAngle={window.innerWidth > 768 ? -Math.PI * 0.55 : -Math.PI * ((window.innerWidth - 300) / (768 - 300) * (0.075 - 0.04) + 0.04)}
        maxAzimuthAngle={window.innerWidth > 768 ? Math.PI * 0.15 : Math.PI * ((window.innerWidth - 300) / (768 - 300) * (0.04 - 0.025) + 0.025)}
        minPolarAngle={window.innerWidth > 768 ? Math.PI * 0.45 : Math.PI * 0.25} // Минимальный угол обзора в радианах (например, 0.1 радиан, чтобы разрешить немножко вниз)
        maxPolarAngle={window.innerWidth > 768 ? Math.PI * 0.57 : Math.PI * 0.5} // Максимальный угол обзора в радианах (например, Math.PI - 0.1 радиан, чтобы разрешить немножко вверх)
        target={[0, camera.position.y, 0]}
        enableDamping={true}
        enablePan={false}
        dampingFactor={0.025}
        rotateSpeed={0.2}
        minDistance={3}
        maxDistance={15}
    />
    <group ref={ref} visible={false} scale={ window.innerWidth > 768 ? (window.innerWidth - 768) / (1920 - 768) * (1 - 0.5) + 0.5 : 1}>
    <Suspense fallback={null}>
        <primitive object={craneFull.scene}/>
        <Text color="white" anchorX="center" anchorY="middle" {...fontProps} position={[-0.5, 39.6, -8.7]} rotation={[0, -1.57, 0]}>
            20 - 70 METPOB
        </Text>
        <Text color="white" anchorX="center" anchorY="middle" {...fontProps} position={[-0.5, 36.6, -10.7]} rotation={[0, -1.57, 0]}>
            5 - 12 ТОНН
        </Text>
        <Preload all />
    </Suspense>

    </group>
    </>
}