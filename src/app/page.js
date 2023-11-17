'use client';
import { Suspense, useState } from "react";
import MainScene from "@/components/three/scenes/mainScene";
import { Canvas } from "@react-three/fiber";


export default function Home() {

  const [started, setStarted] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/*
        Este div es el contenedor del canvas. El canvas abstrae la implementación de la cámara y la escena de base.
        Para ajustar el tamaño del canvas basta con manejar el tamaño del div contenedor.
      */}
      <div className="flex items-center justify-center h-screen w-screen border-solid border-2 border-white">
        {
          started ? 
            <Suspense>
              <Canvas>
                <axesHelper />
                <MainScene />
              </Canvas>
            </Suspense>
            :
            <div className="flex flex-col items-center">
              <button className="p-4 border border-2 border-green" onClick={() => setStarted(true)}>Play</button>
            </div>
        }
      </div>
    </main>
  )
}