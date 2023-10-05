import { useRef } from "react";
import { Environment } from "@react-three/drei";
import EffectComposerComponent from "./effects/EffectComposerComponent";

export default function MyEnvironment(props) {

    const directionalLightRef = useRef()

    const lightSetting = {
        intensity: 1,
        position: [ -100, 150, 20 ],
        color: 'white',
    }

    return <>
    <Environment files={'/backgrounds/environment.hdr'}/>
    <directionalLight ref={ directionalLightRef } {...lightSetting}/>
    {props.activatedMainPage === true && <EffectComposerComponent {...props}/>}
     {/* <EffectComposerComponent {...props}/> */}
    </>
}