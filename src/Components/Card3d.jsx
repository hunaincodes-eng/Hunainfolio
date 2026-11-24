import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexshaders from "../Shaders/Vertexshader.glsl";
import Fragmentshaders from "../Shaders/Fragmentshader.glsl";
const Card3d = ({
  texture,
  index,
  CARD_TOTAL,
  RADIUS,
  CARD_W,
  CARD_H,
  scrollspeedref,
  link,
}) => {
  // Har card ka angle

  const angles = (index / CARD_TOTAL) * 2 * Math.PI;

  // Har card ki position

  const position = useMemo(() => {
    const x = RADIUS * Math.sin(angles);
    const z = RADIUS * Math.cos(angles);

    return [x, 0, z];
  }, [angles, RADIUS]);

 

  return (
    <>
      <mesh
        onClick={() => {
          if (link) {
            window.open(link, "_blank", "noopener,noreferrer");
          }
        }}
        onPointerMove={(e) => {
          mouseRef.current.set(e.uv.x, e.uv.y);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
        onPointerEnter={() => {
          hoverRef.current = 1;
        }}
        onPointerLeave={() => {
          hoverRef.current = 0;
        }}
        position={position}
        rotation={[0, angles, 0]}
      >
        <planeGeometry args={[CARD_W, CARD_H, 1, 1]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Card3d;
