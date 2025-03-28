"use client";

import Container from "@/components/shared/Container";
import LoadingPage from "@/components/shared/LoadingPage";
import { sleep } from "@/utils/promise";
import Script from "next/script";
import { useState } from "react";

export default function SolarPanelSimulator() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Script
        type="text/javascript"
        src="https://apps.reonic.de/elements/reonic-loader.js"
        defer={true}
        onReady={() => {
          sleep(300).then(() => {
            setIsLoading(false);
          });
        }}
      ></Script>
      <Container minH="80vh">
        {isLoading && (
          <LoadingPage h="50vh"> Chargement du simulateur</LoadingPage>
        )}
        <div
          data-reonic-type="element"
          data-product="energyhouse"
          data-client-id="514ba7f5-5767-484e-b3af-be1d0fadf79b"
        ></div>
      </Container>
    </>
  );
}
