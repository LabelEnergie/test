import { Box, BoxProps, Text } from "@chakra-ui/react";
import SignUpForm from "../SignUp/SignUpForm";
import { getAddressWithSimulatorData } from "@/utils/simulator";
import { TSimulatorResult } from "@/types/simulator.types";
import { useEffect, useState } from "react";
import LoadingPage from "../shared/LoadingPage";
import Button from "../shared/Button";
import { getSession } from "@/services/auth.services";
import LoginForm from "../Login/LoginForm";

interface SimulatorSignUpProps extends BoxProps {
  simulatorResult: TSimulatorResult[];
  onEnd(): void;
}

export default function SimulatorSignUp(props: SimulatorSignUpProps) {
  const { simulatorResult, onEnd, ...rest } = props;

  const [isEndSend, setIsEndSend] = useState(false);

  const [type, setType] = useState<"login" | "signup">();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        onEnd();
      } else {
        setType("signup");
      }
    })();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("simulatorResult", JSON.stringify(simulatorResult));
  // }, [simulatorResult]);

  if (type && !isEndSend) {
    // Not connected, need to signup
    return (
      <Box pb={10}>
        <Text fontWeight={800} fontSize={20} mb={8}>
          Accédez à votre estimation sur votre espace sécurisé
        </Text>
        {type == "signup" && (
          <>
            <SignUpForm
              defaultAddress={
                getAddressWithSimulatorData(simulatorResult) ?? undefined
              }
              onEnd={() => {
                onEnd();
                setIsEndSend(true);
              }}
              {...rest}
            />
            <Text
              mt={10}
              mb={2}
              textAlign="left"
              fontSize={18}
              fontWeight={500}
              color="gray.500"
            >
              Déjà un compte ?
            </Text>
            <Button onClick={() => setType("login")}>Me connecter</Button>
          </>
        )}
        {type == "login" && (
          <>
            <LoginForm
              mx="auto"
              onSuccess={() => {
                onEnd();
                setIsEndSend(true);
              }}
              displayForgotPassword={false}
            />
            <Text
              mt={10}
              mb={2}
              textAlign="left"
              fontSize={18}
              fontWeight={500}
              color="gray.500"
            >
              Pas encore de compte ?
            </Text>
            <Button onClick={() => setType("signup")}>Créer mon compte</Button>
          </>
        )}
      </Box>
    );
  }
  return (
    <LoadingPage h="full">Enregistrement de votre simulation...</LoadingPage>
  );
}
