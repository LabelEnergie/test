import RealTimeChat from "@/components/RealTimeChat";
import AppPage from "@/components/shared/AppPage";

export default function AssistancePage() {
  return (
    <AppPage title="Bob" h={"calc(100vh - 200px)"} pb={5}>
      <RealTimeChat
        receiver={{
          id: "b61d30ca-cd36-4948-b354-e1624a4b8c1d",
          name: "Bob",
        }}
      />
    </AppPage>
  );
}
