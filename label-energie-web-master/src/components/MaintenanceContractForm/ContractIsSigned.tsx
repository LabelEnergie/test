"use client";

import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

interface ContractIsSignedProps {}

export default function ContractIsSigned(props: ContractIsSignedProps) {
  const {} = props;

  useEffect(() => {
    localStorage.setItem("signedContract", "issigned2");
    window.close();
  }, []);

  return <Box minH="80vh"></Box>;
}
