"use client";

import { Box, Flex } from "@chakra-ui/react";
import MaintenanceHeader from "./MaintenanceHeader";
import { useEffect, useMemo, useRef, useState } from "react";
import MaintenanceFooter from "./MaintenanceFooter";
import MaintenanceCart from "./MaintenanceCart";
import MaintenanceFormCard from "./MaintenanceFormCard";
import ChangeFormulaModal, {
  ChangeFormulaModalRef,
} from "./MaintenanceModals/ChangeFormulaModal";
import { Form, useZodForm } from "../shared/form/form";
import { z } from "zod";
import { useMaintenanceForm } from "@/services/maintenance.service";
import LoadingPage from "../shared/LoadingPage";
import { useRouter } from "next/navigation";
import { useMe } from "@/services/auth.services";

interface MaintenanceContractFormProps {}

export default function MaintenanceContractForm(
  props: MaintenanceContractFormProps
) {
  const { data: maintenanceForm, isLoading } = useMaintenanceForm();

  const { data: me } = useMe();

  const changeFormulaModalRef = useRef<ChangeFormulaModalRef>(null);
  const router = useRouter();

  const form = useZodForm({ schema: z.any() });

  const [step, setStep] = useState(0);

  const currentTree = useMemo(
    () => maintenanceForm?.tree[step],
    [maintenanceForm?.tree, step]
  );

  function onNext(currentForm?: any) {
    const dependencies =
      currentTree!.dependencies?.[maintenanceForm!.type.type] ?? {};

    let dependencyTypeToLoad = "";

    Object.entries(dependencies).forEach(([key, value]) => {
      if (currentForm[key] == value.ifValue) {
        dependencyTypeToLoad = value.type;
        return;
      }
    });

    switch (dependencyTypeToLoad) {
      case "modal-change-type-to-liberte":
        changeFormulaModalRef.current?.onOpen();
        return;
      default:
        break;
    }

    setStep((s) => s + 1);
    router.push("#formulaire");
  }

  useEffect(() => {
    if (me) {
      // Set default values
      form.reset({
        "code-postal": me.address.zipCode,
        email: me.email,
        nom: me.lastName,
        prenom: me.firstName,
        adresse: me.address,
      });
    }
  }, [me]);

  if (isLoading || !maintenanceForm) {
    return <LoadingPage minH="80vh">Chargement du formulaire...</LoadingPage>;
  }

  const { products, totalPrice, type } = maintenanceForm;

  return (
    <>
      <Form form={form}>
        <MaintenanceHeader step={step} type={type} onChangeStep={setStep} />
        <Box position="relative" py={10} px={5}>
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            justifyContent="center"
            alignItems={{ base: "center", lg: "unset" }}
            scrollMarginTop="100px"
            id="formulaire"
          >
            <MaintenanceFormCard
              currentTree={currentTree!}
              onNext={onNext}
              products={products}
              contractType={type.type}
              onPrevious={
                step > 0 && step != 6
                  ? () => {
                      setStep((s) => s - 1);
                    }
                  : undefined
              }
            />
            <MaintenanceCart
              contractLabel={type.label}
              products={products}
              totalPrice={totalPrice}
            />
          </Flex>
          <MaintenanceFooter />
        </Box>
      </Form>
      <ChangeFormulaModal ref={changeFormulaModalRef} />
    </>
  );
}
