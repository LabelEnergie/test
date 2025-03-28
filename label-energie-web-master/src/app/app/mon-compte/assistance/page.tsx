import RealTimeChat from "@/components/RealTimeChat";
import AppPage from "@/components/shared/AppPage";
import { ADMIN_ID } from "@/services/chat.service";

export default function AssistancePage() {
  return (
    <>
      <AppPage title="LabelEnergie" h={"calc(100vh - 200px)"} pb={5}>
        <RealTimeChat
          receiver={{
            id: ADMIN_ID,
            name: "LabelEnergie",
          }}
          hideHeader
        />
      </AppPage>
    </>
  );
}
