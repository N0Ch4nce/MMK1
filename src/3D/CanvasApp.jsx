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
    dpr={window.innerWidth >= 1440 ? Math.min(window.devicePixelRatio, 2) : Math.min(window.devicePixelRatio, dpr)}
    >
      {window.innerWidth < 1440 &&
      <PerformanceMonitor onIncline={() => setDpr(Math.min(window.devicePixelRatio, 2))} onDecline={() => setDpr(0.9)} /> }
      <MyEnvironment {...props} />
      <CraneModel {...props} />
    </Canvas>    
  </div>
  </>
}