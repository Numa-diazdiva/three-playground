import { useEffect, useRef, useState } from 'react';
import { useThree, useFrame } from "@react-three/fiber"; 
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';


export const mainListener = new THREE.AudioListener();

/*
  Personaje con su mesh (modelo 3D o primitivo) y controles para lograr el movimiento
  Para los controles, aprovechamos la funcionalidad que provee el componente PointerLockControls, que es una implementación de
  R3F que hace uso de la API Pointer Lock de WebAPI
  Nota: hay varias formas de resolver éste problema. Se pueden usar vectores también (THREE.Vector3).
*/
export function Personaje( { props, speed = 0.25 } ) {

  const controlsRef = useRef();
  const [direction, setDirection] = useState('none');
  const { camera } = useThree();

  const movementPerKey = {
    'KeyW': 'forward',
    'KeyS': 'backwards',
    'KeyA': 'left',
    'KeyD': 'right',
    'KeyR': 'resetPos'
  }

  function handleKeyDown(event) {
    setDirection(movementPerKey[event.code]);
  }

  function handleKeyUp(){
    setDirection('none');
  }

  /*
    Añadimos event listeners al documento para manejar los eventos del teclado
  */
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    camera.add(mainListener);
    console.log(camera)
  } ,[]);
  
  useFrame( () => {
      switch (direction) {
        case 'forward':
          controlsRef.current.moveForward(1 * speed);
          break;
        case 'backwards':
          controlsRef.current.moveForward(-1 * speed);
          break;
        case 'left':
          controlsRef.current.moveRight(-1 * speed);
          break;
        case 'right':
          controlsRef.current.moveRight(1 * speed);
          break;
        case 'resetPos':
          camera.position.set(0, 10, 0);
          break;
        case 'none': return;
      }
    }
  );

  return(
    <group>
      <PointerLockControls ref={controlsRef} />
    </group>
  );

}

