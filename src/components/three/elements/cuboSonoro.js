import { useEffect, useRef } from "react";
import * as THREE from 'three';

/**
 * 
 * @param {*}  
 * @returns Mesh component
 */
export default function CuboSonoro({  color="hotpink",
                                      scale=1,
                                      position=[0,0,0],
                                      listener,
                                      waveform="sine",
                                      harmonicComponents=1,
                                      distortFactor=0,
                                      baseFreq=100,
                                      gain=0.5,
                                      onClick=null
                                    })
{
  const meshRef = useRef();
  const oscillatorRef = useRef();  

  const positionalAudio = new THREE.PositionalAudio(listener);
    const gainChannel = listener.context.createGain();

  useEffect(() => {
    gainChannel.gain.value = 0;
    for(let i = 1; i <= harmonicComponents; i++) {
      let synth = listener.context.createOscillator(); // Factory Method del context
      synth.type = waveform;
      let factor = distortFactor > 0 && i != 1 ? i + (Math.random() - 0.5) * distortFactor : i;
      synth.frequency.value = baseFreq * factor ;
      synth.connect(gainChannel);
      synth.start(0);
    }
    positionalAudio.setNodeSource(gainChannel);
    meshRef.current.add(positionalAudio);
    console.log(meshRef.current)
  },[])

  function envelope() {
    gainChannel.gain.value = 0;
    gainChannel.gain.setTargetAtTime(gain, listener.context.currentTime + 0.001, 1)
    gainChannel.gain.setTargetAtTime(gain * 0.8, listener.context.currentTime + 1.1, 0.5)
    gainChannel.gain.setTargetAtTime(0, listener.context.currentTime + 2, 0.5)
  }


  return(
    <mesh ref={meshRef} position={position} scale={scale} onClick={envelope}>
      <meshStandardMaterial color={color} />
      <boxGeometry args={[1,1,1]} />
    </mesh>
  );
}