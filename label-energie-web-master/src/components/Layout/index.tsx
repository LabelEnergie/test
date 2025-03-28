"use client";

import { Box } from "@chakra-ui/react";
import { ReactNode, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  const pathname = usePathname();

  if (pathname.includes("/app")) {
    return <Suspense>{children}</Suspense>;
  }

  return (
    <Box id="main-scroll" maxH="100vh" overflowY="auto" overflowX="hidden">
      <Box position="sticky" top={0} zIndex={998} bg="white">
        <Header />
      </Box>
      <Suspense>{children}</Suspense>
      {!pathname.includes("/simulateur") && <Footer />}
    </Box>
  );
}
