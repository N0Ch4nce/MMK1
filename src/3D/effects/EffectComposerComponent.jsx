import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef } from 'react'


export default function EffectComposerComponent(props) {
    const bloomRef = useRef()

    return <>
    <EffectComposer stencilBuffer={true} >
        <Bloom mipmapBlur={true} ref={bloomRef} intensity={4} luminanceThreshold="3" luminanceSmoothing="0" />
    </EffectComposer>
    </> 
}