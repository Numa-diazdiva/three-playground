import { mainListener, Personaje } from "../elements/personaje";
import CuboSonoro from "../elements/cuboSonoro";

export default function MainScene() {

  return(
    <group>
      <Personaje />
      <ambientLight intensity={0.9} />
      
      <CuboSonoro color={"#FAFAFA"}
                  position={[1,1,1]}
                  scale={2}
                  listener={mainListener}
                  harmonicComponents={3}
                  distortFactor={0.1}
                  />
      <CuboSonoro color={"#FAFAFA"}
                  position={[50,1,50]}
                  scale={2}
                  listener={mainListener}
                  baseFreq={300}
                  harmonicComponents={7}
                  distortFactor={0.1}
                  gain={0.1}
                  />
      <CuboSonoro color={"#FAFAFA"}
                  position={[150,1,150]}
                  scale={2}
                  listener={mainListener}
                  baseFreq={211}
                  harmonicComponents={20}
                  distortFactor={0.1}
                  gain={0.1}
                  />
    </group>
  );
}