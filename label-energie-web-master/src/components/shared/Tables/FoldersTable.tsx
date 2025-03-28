import {
  Box,
  Image,
  SkeletonText,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Status from "../Status";
import { TFolder } from "@/types/folder.type";
import { Fragment } from "react";
import { High } from "../High";

interface FoldersTableProps {
  isLoading?: boolean;
  folders?: TFolder[];
  onFolderClick?(f: TFolder): void;
}

export default function FoldersTable(props: FoldersTableProps) {
  const { isLoading, folders, onFolderClick } = props;

  return (
    <Box
      overflowX="auto"
      px={{ base: 5, lg: 20 }}
      maxW={{ md: "calc(100vw - 250px)" }}
      mt={{ base: 10, md: 0 }}
    >
      {!isLoading && !folders?.length ? (
        <Text
          color="king"
          fontWeight={800}
          textAlign="center"
          fontSize={20}
          pt={5}
        >
          Vous n'avez aucun dossier pour le moment
        </Text>
      ) : (
        <Table minW="800px">
          <Thead
            sx={{
              bg: "king",
            }}
          >
            <Tr>
              <Td>Projets</Td>
              <Td>N° Dossier</Td>
              <Td>Statut</Td>
              <Td maxW="50px" />
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <Tr>
                <Td>
                  <SkeletonText noOfLines={1} skeletonHeight={6} />
                </Td>
                <Td>
                  <SkeletonText noOfLines={1} skeletonHeight={6} />
                </Td>
                <Td>
                  <SkeletonText noOfLines={1} skeletonHeight={6} />
                </Td>
                <Td>
                  <SkeletonText noOfLines={1} skeletonHeight={6} />
                </Td>
              </Tr>
            )}
            {folders?.map((f, index) => (
              <Tr
                onClick={() => {
                  onFolderClick?.(f);
                  console.log('Clicked folder products:', f.products);
                }}
                key={f.id}
              >
                <Td>
                  <VStack align="stretch">
                    {f.products?.map((p, i) => {
                      const workTypeMap: { [key: string]: string } = {
                        "1": "Pompe à Chaleur Air/Eau",
                        "2": "Pompe à Chaleur Air/Air",
                        "3": "Isolation des murs",
                        "4": "Poêle à granule",
                        "5": "Chaudière à granule",
                        "6": "Chauffe-eau Thermodynamique",
                        "7": "Système Solaire Combiné",
                        "8": "Panneaux Photovoltaïques Hybrides",
                        "9": "Panneaux Solaires Photovoltaïques",
                        "10": "Chauffe-eau Solaire"
                      };
                      
                      // Check for travaux type and handle both string and number IDs
                      const productId = typeof p.id === 'number' ? p.id : parseInt(p.id);
                      if (productId === 3 && p.type?.toLowerCase().includes('travaux')) {
                        const workType = workTypeMap[p.type || ""] || "Type de travaux non spécifié";
                        return (
                          <Fragment key={p.id}>
                            <Text>
                              <High color="primary">•</High> Projet de {workType}
                            </Text>
                          </Fragment>
                        );
                      }
                      return null;
                    })}
                  </VStack>
                </Td>
                <Td w="150px">{String(index + 1).padStart(5, '0')}</Td>
                <Td>
                  <Status color={f.status.color} label={f.status.label} />
                </Td>
                <Td w="80px">
                  <Image
                    src="/icons/oeil.svg"
                    alt="Voir le dossier"
                    boxSize={"25px"}
                    cursor="pointer"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
