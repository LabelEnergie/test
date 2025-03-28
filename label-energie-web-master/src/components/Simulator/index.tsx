"use client";

import {
  useCreateSimulation,
  useSimulatorTree,
} from "@/services/simulator.service";
import {
  TSimulatorResult,
  TSimulatorResultValue,
  TSimulatorTree,
} from "@/types/simulator.types";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import SimulatorForm from "./SimulatorForm";
import { addDataToSimulatorResult, isIdf } from "@/utils/simulator";
import LoadingPage from "../shared/LoadingPage";
import { sleep } from "@/utils/promise";
import SimulatorProgressBar from "./SimulatorProgressBar";
import { useRouter } from "next/navigation";

let dependenciesQueue: TSimulatorTree[] = []; // Dependencies to send before the next root question

export default function Simulator() {
  const router = useRouter();

  const { data: tree, isLoading } = useSimulatorTree();
  // const tree = data ? [data[10]] : undefined;

  const { mutate: sendSimulation } = useCreateSimulation();

  const [simulatorResult, setSimulatorResult] = useState<TSimulatorResult[]>(
    []
    // TEST_SIMULATION
  );
  const [simulatorMemory, setSimulatorMemory] = useState<TSimulatorResult[]>(
    []
    // TEST_SIMULATION
  );
  const [currentStep, setCurrentStep] = useState<TSimulatorTree>();
  const [isEnd, setIsEnd] = useState(false);

  const currentParentIndex = useMemo(
    () => tree?.findIndex((t) => t.id == currentStep?.id.split(".")[0]) ?? 0,
    [tree, currentStep]
  );

  const progress = useMemo(() => {
    return currentParentIndex / (tree?.length ?? 1);
  }, [tree, currentParentIndex]);

  function loadNextDependency() {
    const newStep = dependenciesQueue.pop();
    if (!newStep) return;

    setCurrentStep(newStep);
  }

  function onNext(value?: TSimulatorResultValue) {
    if (!currentStep || !tree || value == undefined) return null;

    const newValue: TSimulatorResult = {
      id: currentStep.id,
      type: currentStep.type,
      value,
    };

    setSimulatorResult((r) => addDataToSimulatorResult(r, newValue));
    setSimulatorMemory((r) => addDataToSimulatorResult(r, newValue));

    // Test if have other dependencies to sent
    if (dependenciesQueue.length > 0) {
      loadNextDependency();
      return;
    }

    let currentDependencies = currentStep.dependencies;

    // Test if have IdfDependencies
    if (currentStep.idfDependencies) {
      const isInIdf = isIdf(simulatorResult);
      if (isInIdf) {
        currentDependencies = currentStep.idfDependencies;
      }
    }

    // Test if this response have dependencies
    const newDependencies: TSimulatorTree[] = [];
    if (Array.isArray(value)) {
      for (const responseId of value) {
        const childDependencies = currentDependencies?.[responseId];
        if (childDependencies) {
          newDependencies.push(
            ...childDependencies.map((c) => ({
              ...c,
              id: `${currentStep.id}.${responseId}.${c.id}`,
            }))
          );
        }
      }
    } else {
      const childDependencies = currentDependencies?.[value.toString()];
      if (childDependencies?.length) {
        newDependencies.push(
          ...childDependencies.map((c) => ({
            ...c,
            id: `${currentStep.id}.${value}.${c.id}`,
          }))
        );
      }
    }

    // Load next question
    if (newDependencies.length) {
      dependenciesQueue = [...newDependencies].reverse();
      loadNextDependency();
    } else if (tree.length - 1 > currentParentIndex) {
      setCurrentStep(tree[currentParentIndex + 1]);
    }

    scrollTop();
  }

  function onPrevious() {
    if (!tree) return;

    let lastResult = simulatorResult[simulatorResult.length - 1];

    if (lastResult.id.includes(".")) {
      // Last result to load is dependency
      const [rootId, responseId, dependencyId] = lastResult.id.split(".");
      const dependencyStep = tree
        .find((t) => t.id == rootId)
        ?.dependencies?.[responseId].find((d) => d.id == dependencyId);
      if (!dependencyStep) return;

      // If current step is dependence, add in queue (will be loose otherwise)
      if (currentStep?.id.includes(".")) {
        dependenciesQueue.push(currentStep);
      }

      // Set previous step
      setCurrentStep({ ...dependencyStep, id: lastResult.id });
    } else {
      setCurrentStep(tree.find((t) => t.id == lastResult.id));
      dependenciesQueue = [];
    }
    setSimulatorResult((result) => result.filter((r) => r.id != lastResult.id));

    scrollTop();
  }

  function scrollTop() {
    const scrollDiv = document.getElementById("main-scroll");
    scrollDiv?.scrollTo({ top: 0 });
  }

  function onEnd() {
    // Send this simulation
    sendSimulation(
      { simulation: simulatorResult },
      {
        onSuccess() {
          // Redirect to folders page
          router.push("/app/mon-compte/mes-dossiers");
        },
        onError() {
          // No need to stop loading on success because redirect
          setIsEnd(true);
        },
      }
    );
  }

  useEffect(() => {
    if (tree) {
      setCurrentStep(tree[0]);
      // setCurrentStep(tree[12]);
    }
  }, [tree]);
  return (
    <Box
      h={{ base: "calc(100vh - 60px)", lg: "calc(100vh - 100px)" }}
      position="relative"
      pt={{ base: 5, lg: 10 }}
    >
      {isLoading && (
        <LoadingPage h="full">Chargement du simulateur...</LoadingPage>
      )}

      {!isLoading && !isEnd && currentStep && (
        <Flex
          flexDir={"column"}
          textAlign="center"
          alignItems="center"
          h="full"
        >
          <SimulatorProgressBar progress={progress} />

          {/* {BASE.MODE == "DEV" && (
            <Box position="absolute" top={4} right={0}>
              <Text>Résultat : {JSON.stringify(simulatorResult)}</Text>
              <Text>Mémoire : {JSON.stringify(simulatorMemory)}</Text>
            </Box>
          )} */}

          <SimulatorForm
            onNext={async (value) => {
              if (
                value &&
                ["select", "select-multi"].includes(currentStep.type)
              ) {
                await sleep(200);
              }
              onNext(
                value ??
                  simulatorMemory.find((m) => m.id == currentStep?.id)?.value
              );
            }}
            simulatorResult={simulatorResult}
            displayOnNext={
              simulatorMemory.find((m) => m.id == currentStep.id) != undefined
            }
            onPrevious={currentParentIndex > 0 ? onPrevious : undefined}
            defaultValue={
              simulatorMemory.find((i) => i.id == currentStep.id)?.value
            }
            onEnd={onEnd}
            {...currentStep}
          />
        </Flex>
      )}
    </Box>
  );
}
