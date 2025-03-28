import ContractIsSigned from "@/components/MaintenanceContractForm/ContractIsSigned";

export default function SignedContract(props: {
  searchParams: { event: string };
}) {
  if (props.searchParams.event == "signing_complete") {
    return <ContractIsSigned />;
  }
  return <></>;
}
