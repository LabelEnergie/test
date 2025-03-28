import { TMaintenanceTree, TProduct } from "@/types/maintenance.types";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import Card from "../shared/Card";
import GradientDivider from "../shared/GradientDivider";
import { Fragment, useMemo } from "react";
import { Input } from "../shared/form/Input";
import { MaintenanceSelect } from "./MaintenanceFields/MaintenanceSelect";
import Button from "../shared/Button";
import { InputAddress } from "../shared/form/InputAddress";
import MaintenanceFieldWrapper from "./MaintenanceFields/MaintenanceFieldWrapper";
import { MaintenanceSchedule } from "./MaintenanceFields/MaintenanceSchedule";
import MaintenanceCheckContract from "./MaintenanceFields/MaintenanceCheckContract";
import {
  MaintenancePayementInput,
  stripePromise,
} from "./MaintenanceFields/MaintenancePaymentInput";
import { Elements } from "@stripe/react-stripe-js";
import { useFormContext } from "react-hook-form";

interface MaintenanceFormCardProps {
  onNext(currentForm?: any): void;
  onPrevious?(): void;
  currentTree: TMaintenanceTree;
  products: TProduct[];
  contractType: string;
}

export default function MaintenanceFormCard(props: MaintenanceFormCardProps) {
  const {
    onNext,
    currentTree: { items, title, subtitle, hideButton },
    products,
    contractType,
    onPrevious,
  } = props;

  const form = useFormContext();

  const isButtonDisabled = useMemo(() => {
    const requiredIds = items.filter((i) => !i.notRequired).map((i) => i.id);
    const values = form.getValues();

    let disabled = false;

    requiredIds.forEach((id) => {
      if (!values[id]) {
        disabled = true;
        return;
      }
    });

    return disabled;
  }, [form.watch(), items]);

  return (
    <Card
      w="full"
      maxW="570px"
      mr={{ lg: 5 }}
      p={{ base: 3, md: 7 }}
      h="fit-content"
      position="relative"
    >
      {onPrevious && (
        <HStack
          cursor="pointer"
          onClick={onPrevious}
          position={{ md: "absolute" }}
          top={4}
          left={4}
        >
          <Image src="/icons/caret.svg" h="25px" />
          <Text color="primary" fontWeight={600}>
            Retour
          </Text>
        </HStack>
      )}
      <Text textAlign="center" fontWeight={600} fontSize={18}>
        {title}
      </Text>
      <GradientDivider zoom={false} mt={3} mb={7} />
      {subtitle && (
        <Text mb={7} textAlign="center" fontSize={13}>
          {subtitle}
        </Text>
      )}
      <VStack spacing={5} align="stretch">
        {items.map(({ id, type, placeholder, title, values }) => (
          <Fragment key={id}>
            {type == "input" && (
              <MaintenanceFieldWrapper label={title}>
                <Input label={placeholder} {...form.register(id)} />
              </MaintenanceFieldWrapper>
            )}
            {type == "select" && (
              <MaintenanceSelect
                options={values ?? []}
                label={title}
                {...form.register(id)}
              />
            )}
            {type == "input-address" && (
              <MaintenanceFieldWrapper label={title}>
                <InputAddress {...form.register(id)} />
              </MaintenanceFieldWrapper>
            )}
            {type == "input-date" && (
              <MaintenanceSchedule {...form.register(id)} />
            )}
            {type == "input-contract" && (
              <MaintenanceCheckContract
                products={products}
                onSubmit={onNext}
                type={contractType}
                {...form.register(id)}
              />
            )}
            {type == "input-payment" && (
              <Elements stripe={stripePromise}>
                <MaintenancePayementInput
                  products={products}
                  type={contractType}
                  {...form.register(id)}
                />
              </Elements>
            )}
          </Fragment>
        ))}
      </VStack>
      {!hideButton && (
        <Button
          h="55px"
          mx="auto"
          mt={10}
          isDisabled={isButtonDisabled}
          onClick={() => onNext(form.getValues())}
        >
          Continuer
        </Button>
      )}
    </Card>
  );
}
