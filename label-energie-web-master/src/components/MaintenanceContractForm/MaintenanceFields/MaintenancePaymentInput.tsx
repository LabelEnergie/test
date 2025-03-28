import { Box, Text, useToast } from "@chakra-ui/react";
import { MaintenanceSelect } from "./MaintenanceSelect";
import { useFormContext } from "react-hook-form";
import { forwardRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { IbanElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCreateSubscription } from "@/services/payment.service";
import Button from "@/components/shared/Button";
import { BASE } from "@/constants";
import { TProduct } from "@/types/maintenance.types";
import { useStoreSignedContract } from "@/services/maintenance.service";
import { useRouter } from "next/navigation";

// Source : ChatGPT & https://rudrakshdixit24.medium.com/set-up-a-subscription-with-stripes-sepa-using-react-and-nodejs-234ace2e2d56

export const stripePromise = loadStripe(BASE.STRIPE_KEY_TEST);

interface MaintenancePayementInputProps {
  products: TProduct[];
  type: string;
}

export const MaintenancePayementInput = forwardRef<
  any,
  MaintenancePayementInputProps
>((props, ref) => {
  const { type, products } = props;

  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const { watch, register, getValues } = useFormContext();
  const { mutate: createSubscription } = useCreateSubscription();
  const { mutate: storeSignedContract } = useStoreSignedContract();

  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isIbanValid, setIsIbanValid] = useState(false);

  const paymentType = watch("payment-type");

  async function onPayment() {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const ibanElement = elements.getElement(IbanElement);

    if (!ibanElement) {
      setIsProcessing(false);
      return null;
    }

    const userEmail = getValues("email");
    const userName = getValues("prenom") + " " + getValues("nom");

    // 1 : Create payment method
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "sepa_debit",
      sepa_debit: ibanElement,
      billing_details: {
        email: userEmail,
        name: userName,
      },
    });

    if (pmError) {
      toast({
        title: "Erreur lors de la création de la méthode de paiement",
        description: pmError.message,
        status: "error",
        position: "top",
        duration: 4000,
      });
      setIsProcessing(false);
      return;
    }
    const paymentMethodId = paymentMethod.id;

    // 2 : Create subscription
    createSubscription(
      {
        interval: paymentType,
        contract: {
          productIds: products.map((p) => p.id),
          type: type as any,
        },
        paymentMethodId,
        email: userEmail,
      },
      {
        async onSuccess(subscription) {
          // 3 : Enable payments
          const { error } = await stripe.confirmSepaDebitPayment(
            subscription?.latest_invoice?.payment_intent?.client_secret,
            {
              payment_method: paymentMethodId,
            }
          );

          if (error) {
            toast({
              title: "Impossible d'activer l'abonnement",
              description: error.message,
              status: "error",
              position: "top",
              duration: 4000,
            });
            setIsProcessing(false);
          } else {
            storeSignedContract(
              { envelopeId: getValues("envelopeId") },
              {
                onSuccess() {
                  toast({
                    title: "Abonnement activé",
                    description:
                      "Vous allez être redirigé vers votre espace client",
                    status: "success",
                    position: "top",
                    duration: 4000,
                  });
                  router.push("/app/mon-compte/mes-contrats");
                },
                onSettled() {
                  setIsProcessing(false);
                },
              }
            );
          }
        },
        onError(err) {
          toast({
            title: "Impossible de créer l'abonnement",
            description: err.message,
            status: "error",
            position: "top",
            duration: 4000,
          });
          setIsProcessing(false);
        },
      }
    );
  }

  return (
    <Box>
      <MaintenanceSelect
        options={[
          { title: "Mensuel", id: "month" },
          { title: "Annuel", id: "year" },
        ]}
        {...register("payment-type")}
      />

      {paymentType && (
        <Box w="full" bg="gray.100" rounded="md" px={7} py={2} mt={4}>
          <Text>
            Vous allez être prélevé une fois par{" "}
            {paymentType == "month" ? "mois" : "an"}.{" "}
          </Text>
        </Box>
      )}
      <Text textAlign="center" fontSize={25} fontWeight={600} my={7}>
        Prélèvement
      </Text>
      <Box borderWidth={2} borderColor="gray.200" rounded="md" py={3} px={2}>
        <IbanElement
          onChange={(e) => {
            setIsIbanValid(e.complete);
          }}
          options={{
            supportedCountries: ["SEPA"],
            placeholderCountry: "FR",
            style: {
              base: {
                fontSize: "18px",

                ":focus": {
                  backgroundColor: "white",
                },
              },
            },
          }}
        />
      </Box>
      <Text>IBAN de test : DE89370400440532013000</Text>
      <Text my={10}>Paiement sécurisé avec cryptage SSL</Text>
      <Button
        onClick={() => onPayment()}
        mx="auto"
        h="55px"
        px={10}
        isLoading={isProcessing}
        isDisabled={!isIbanValid || !paymentType}
      >
        Valider
      </Button>
      <Text mt={10} fontWeight={200}>
        En cliquant sur « Payer », vous autorisez Label Energie à envoyer des
        instructions à votre banque pour débiter votre compte, et votre banque à
        débiter votre compte conformément aux instructions de Label Energie.
        Vous bénéficiez du droit d’être remboursé par votre banque selon les
        conditions décrites dans la convention que vous avez passée avec elle.
        Une demande de remboursement doit être présentée dans les 8 semaines
        suivant la date de débit de votre compte pour un prélèvement autorisé
      </Text>
    </Box>
  );
});
