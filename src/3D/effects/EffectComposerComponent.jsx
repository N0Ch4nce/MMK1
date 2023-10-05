import { EffectComposer, Bloom } from '@react-three/postprocessing'


export default function EffectComposerComponent(props) {
    return <>
    <EffectComposer stencilBuffer={true} >
        <Bloom mipmapBlur={true} intensity="4" luminanceThreshold="3" luminanceSmoothing="0" />
    </EffectComposer>
    </> 
}