import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, Preload } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import CraneModel from './Models/CraneModel.jsx';
import MyEnvironment from './MyEnvironment.jsx';

export default function CanvasApp(props) {
  const [dpr, setDpr] = useState(1)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [touchScreen, setTouchScreen] = useState(false)
  const canvasRef = useRef()
  
  return <>
  <div className="canvasParent">
    <Canvas
    ref={canvasRef}
    eventPrefix={"client"}
    eventSource={document.querySelector('.canvasParent')}
    camera={{ fov: 50, position: [0, 5, 6], near: 0.01, far: 150 }}
    dpr={windowWidth > 768 ? dpr : 2}
    >
      {/* <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} /> */}
      <MyEnvironment {...props} />
      <CraneModel {...props} />
    </Canvas>    
  </div>
  </>
}