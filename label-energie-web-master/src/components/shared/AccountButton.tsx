"use client";

import { Box, BoxProps, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AccountButton(props: BoxProps) {
  const router = useRouter();

  const [isLogged, setIsLogged] = useState(false);

  function onClick() {
    router.push(
      isLogged ? "/app/mon-compte/mes-informations" : "/app/connexion"
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogged(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Box onClick={onClick} cursor="pointer" {...props}>
      <Image
        alt=""
        title=""
        boxSize={{ base: "40px", xl: "50px" }}
        minW={{ base: "40px", xl: "50px" }}
        src="/icons/espace_client.png"
      />
    </Box>
  );
}
