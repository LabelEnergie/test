import { TGenerateContractBody, TMaintenanceForm } from "@/types/maintenance.types";
import { db } from "@/config/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { collection, doc, getDoc, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { folderKeys } from "./keys.service";

export function useMaintenanceForm() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<TMaintenanceForm>();
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter();

  const type = useMemo(() => searchParams.get("type"), [searchParams]);
  const products = useMemo(() => {
    const p = searchParams.get("produits");
    return p ? p.split(",") : ["1"];
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        const maintenanceDoc = await getDoc(doc(db, 'maintenance_forms', type || 'default'));
        if (maintenanceDoc.exists()) {
          setData(maintenanceDoc.data() as TMaintenanceForm);
        }
      } catch (err) {
        setData(undefined);
        const currentPath = `/services/contrat-entretien?type=${type || ""}&produits=${products.join(",") || ""}`;
        const redirectUrl = `/app/connexion?redirect=${encodeURIComponent(currentPath)}`;
        router.push(redirectUrl);
      }
      setisLoading(false);
    })();
  }, []);

  return { isLoading, data };
}

export function useGenerateMaintenanceContract() {
  return useMutation({
    mutationFn: async (body: TGenerateContractBody) => {
      const contractRef = await addDoc(collection(db, 'maintenance_contracts'), {
        ...body,
        status: 'pending',
        createdAt: new Date()
      });
      
      return {
        recipientViewUrl: `${window.location.origin}/contracts/${contractRef.id}/view`,
        docUrl: `${window.location.origin}/contracts/${contractRef.id}/document`,
        envelopeId: contractRef.id
      };
    },
  });
}

export function useStoreSignedContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: { envelopeId: string }) => {
      await updateDoc(doc(db, 'maintenance_contracts', body.envelopeId), {
        status: 'signed',
        signedAt: new Date()
      });
      
      return {
        docUrl: `${window.location.origin}/contracts/${body.envelopeId}/document`
      };
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: folderKeys.list(),
      });
    },
  });
}
