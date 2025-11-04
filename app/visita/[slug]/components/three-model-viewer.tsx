"use client";

import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Bounds,
  Center,
  ContactShadows,
  Html,
  OrbitControls,
  Stage,
  useBounds,
  useGLTF,
} from "@react-three/drei";
import { Box, CircularProgress } from "@mui/material";

interface ThreeModelViewerProps {
  url: string;
  autoRotate?: boolean;
}

function FitOnLoad({ children }: { children: React.ReactNode }) {
  const bounds = useBounds();
  useEffect(() => {
    // Calcula límites de lo que haya dentro y ajusta cámara/target
    bounds.refresh().fit();
  }, [bounds]);
  return <>{children}</>;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  // Opcional: si los modelos vienen con escalas muy dispares,
  // puedes normalizarlos (ej. scale={1}) y dejar que Bounds haga el resto.
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export default function ThreeModelViewer({
  url,
  autoRotate = true,
}: ThreeModelViewerProps) {
  // Si tus URLs son estáticas, puedes pre-cargar:
  // useGLTF.preload(url);

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 320, md: 480 },
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, near: 0.1, far: 100 }}>
        <Suspense
          fallback={
            <Html center>
              <CircularProgress size={28} />
            </Html>
          }
        >
          {/* Stage da luz bonita y sombras realistas; environment=“city” ayuda en metálicos */}
          <Stage
            intensity={1}
            environment="city"
            adjustCamera={false} // dejamos el encuadre a Bounds
            shadows="contact"
          >
            {/* Bounds encuadra todo el contenido y ajusta la cámara automáticamente */}
            <Bounds fit clip observe margin={1.2}>
              <FitOnLoad>
                <Model url={url} />
              </FitOnLoad>
            </Bounds>
          </Stage>

          {/* Sombras de contacto suaves en el “suelo” */}
          <ContactShadows
            frames={1}
            position={[0, -0.5, 0]}
            scale={10}
            blur={2}
            opacity={0.35}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          autoRotate={autoRotate}
          autoRotateSpeed={0.6}
          minDistance={2}
          maxDistance={20}
          // evita que el usuario se vaya por debajo del “suelo”
          maxPolarAngle={Math.PI * 0.95}
        />
      </Canvas>
    </Box>
  );
}
