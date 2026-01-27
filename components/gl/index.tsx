import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";

export const GL = ({ hovering }: { hovering: boolean }) => {
  // Static configuration values (previously from leva controls)
  const speed = 1.0;
  const focus = 3.8;
  const aperture = 1.79;
  const size = 512;
  const noiseScale = 0.6;
  const noiseIntensity = 0.52;
  const timeScale = 1;
  const pointSize = 10.0;
  const opacity = 0.8;
  const planeScale = 10.0;
  const vignetteDarkness = 1.5;
  const vignetteOffset = 0.4;
  const useManualTime = false;
  const manualTime = 0;

  return (
    <div id="webgl" className="relative">
      <Canvas
        camera={{
          position: [
            1.2629783123314589, 2.664606471394044, -1.8178993743288914,
          ],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
      >
        <color attach="background" args={["#000"]} />
        <Particles
          speed={speed}
          aperture={aperture}
          focus={focus}
          size={size}
          noiseScale={noiseScale}
          noiseIntensity={noiseIntensity}
          timeScale={timeScale}
          pointSize={pointSize}
          opacity={opacity}
          planeScale={planeScale}
          useManualTime={useManualTime}
          manualTime={manualTime}
          introspect={hovering}
        />
      </Canvas>
      {/* CSS-based vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent ${vignetteOffset * 50}%, rgba(0,0,0,${vignetteDarkness * 0.5}) 100%)`,
        }}
      />
    </div>
  );
};
