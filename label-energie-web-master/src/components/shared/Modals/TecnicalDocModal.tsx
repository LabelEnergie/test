"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  SimpleGrid,
  Image,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Button, // Add this line to import Button
} from "@chakra-ui/react";
import { forwardRef,useImperativeHandle, useState } from "react";
import { FaSearch, FaEye, FaDownload } from "react-icons/fa";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";

interface Product {
  name: string;
  category: string;
  models: {
    name: string;
    docUrl: string;
  }[];
}

const BRANDS = [
  {
    name: "Ariston",
    logo: "/images/brands/ariston.png",
    products: [
      {
        name: "Ballon Thermodynamique",
        category: "BTD",
        models: [
          { name: "NUOS PRIMO 200", docUrl: "/documents/DocTechnique/ARISTON/BTD/NUOSPRIMO200.pdf" },
        ]
      },
      {
        name: "Pompe à Chaleur Air Eau",
        category: "PAC",
        models: [
          { name: "NIMBUS NET", docUrl: "/documents/DocTechnique/ARISTON/PAC AIR EAU/NIMBUS NET.pdf" },
          { name: "NIMBUS PLUS NET", docUrl: "/documents/DocTechnique/ARISTON/PAC AIR EAU/NIMBUS PLUS NET.pdf" },
        ]
      }
    ]
  },

  {
    name: "Atlantic",
    logo: "/images/brands/atlantic.png",
    products: [
      {
        name: "Pompe à Chaleur Air Eau",
        category: "PAC",
        models: [
          { name: "AFLEA EXCELLIA AI", docUrl: "/documents/DocTechnique/ATLANTIC/AIR EAU/AFLEA EXCELLIA AI.pdf" },
        ]
      },
      {
        name : "Pome à Chaleur Air Air",
        category : "PAC",
        models :[
          {name : "Pac-Air-Air-Atlantic-Multisplit-Dojo", docUrl :"/documents/DocTechnique/ATLANTIC/PAC AIR AIR/Pac-Air-Air-Atlantic-Multisplit-Dojo.pdf"}
        ]
      },
      {
        name : "Chaffe-eau thermodynamique",
        category :"BTD",
        models:[
          {name: "Stable Explorer 4", docUrl :"/documents/DocTechnique/ATLANTIC/BTD/Stable-Explorer4-Atlantic.pdf"},
          {name:"Explorer" , docUrl :"/documents/DocTechnique/ATLANTIC/BTD/Explorer-Atlantic.pdf"} 
        ]
      }
    ]
  },
  {
    name: "CHAFFOTEAU",
    logo: "/images/brands/chaffoteaux.png",
    products: [
      {
        name: "Pompe à Chaleur Air Eau",
        category: "PAC",
        models: [
          { name: "Arianext-S", docUrl: "/documents/DocTechnique/CHAFFOTEAU/PAC AIR EAU/Arianext-S.pdf" },
        ]
      }
    ]
  },
  {
    name:"DAIKIN",
    logo: "/images/brands/daikin.png",
    products: [
      {
        name: "Pompe à Chaleur Air Air",
        category: "PAC",
        models: [
          { name: "GAMME CTXS ET FTXS", docUrl: "/documents/DocTechnique/DAIKIN/PAC AIR AIR/GAMME CTXS ET FTXS.pdf" },
          {name : "MULTI SPLIT MXS-E-F-G-H-K" , docUrl :"/documents/DocTechnique/DAIKIN/PAC AIR AIR/MULTI SPLIT MXS-E-F-G-H-K.pdf"}
        ]
      },
      {
        name:"Pompe à chaleur Air Eau",
        category:"PAC",
        models:[
          {name:"Altherma 3 H Moyenne Température 60°C 11 - 14 -16 kW", docUrl:"/documents/DocTechnique/DAIKIN/PAC AIR EAU/Altherma 3 H Moyenne Température 60°C 11 - 14 -16 kW.pdf"},
          {name:"Altherma R HT Haute Température 80°C 11 - 14 - 16 kW", docUrl:"/documents/DocTechnique/DAIKIN/PAC AIR EAU/Altherma R HT Haute Température 80°C 11 - 14 - 16 kW.pdf"},

        ]
      }
    ]
  },
  {
    name:"LG",
    logo:"/images/brands/lg.png",
    products:[
      {
        name :"Pompe à chaleur Air Eau",
        category:"PAC",
        models : [
          {name:"Therma V 57°C SPLIT", docUrl:"/documents/DOcTechnique/LG/PAC AIR EAU/Therma V 57°C SPLIT.pdf"},
          {name:"Therma V 65°C HYDROSPLIT",docUrl:"/documents/DOcTechnique/LG/PAC AIR EAU/Therma V 65°C HYDROSPLIT.pdf"},
          {name:"Therma V 65°C SPLIT", docUrl:"/documents/DOcTechnique/LG/PAC AIR EAU/Therma V 65°C SPLIT.pdf"},
          {name:"Therma V 80°C SPLIT HAUTE TEMPÉRATURE", docUrl:"/documents/DOcTechnique/LG/PAC AIR EAU/Therma V 80°C SPLIT HAUTE TEMPÉRATURE.pdf"},
        ]
      },
      {
        name :"Pompe à Chaleur Air Air",
        category : "PAC",
        models: [
          {name :"DUALCOOL", docUrl :"/documents/DocTechnique/LG/PAC AIR AIR/DUALCOOL.pdf"},
          {name :"MULTI SANS BOITIER", docUrl :"/documents/DocTechnique/LG/PAC AIR AIR/MULTI SANS BOITIER.pdf"},
          {name :"Multi-Split", docUrl :"/documents/DocTechnique/LG/PAC AIR AIR/Multi-Split.pdf"}
        ]
      }
    ]
  },
  {
    name:"ORION",
    logo:"/images/brands/orion.png",
    products:[
      {
        name :"Chauffe eau solaire",
        category:"CES",
        models : [ 
          {name:"BT SOLAIRE 150L",docUrl:"/documents/DocTechnique/ORION/CES/BT SOLAIRE 150L.pdf"},
          {name :"SUNCOMPACT", docUrl:"/documents/DocTechnique/ORION/CES/SUNCOMPACT-GENERAL.pdf"}
        ]
      },
      {
      name: "Système solaire combiné",
      category:"SSC",
      models : [
        {name : "Capteurs FT Combi Star 420 ORION + capteur" ,docUrl : "/documents/DocTechnique/ORION/SSC/Capteurs FT Combi Star 420 ORION + capteur.pdf"}
        ]
      },
      {
        name :"Panneau Solaire Hybride",
        category:"PVT",
        models: [
          {name:"SunPVT 2.0",docUrl:"/documents/DocTechnique/ORION/PVT/SunPVT 2.0.pdf"}
        ]
      }
     
    ]
  },
  {
    name: "PANASONIC",
    logo : "/images/brands/panasonic.png",
    products:[
      {
        name :"Chaffe-eau thermodynamique",
        category:"BTD",
        models : [
          {name:"Aquarea",docUrl:"/documents/DocTechnique/PANASONIC/BTD/Chauffe-eau-thermodynamique-aquarea.pdf"}

        ]
      },
     
    ]
  },
  {
    name : "SAMSUNG",
    logo :"/images/brands/samsung.png",
    products:[
      {
        name:"Pompe à chaleur Air Eau",
        category : "PAC",
        models : [
          {name :"ClimateHub" , docUrl: "/documents/DocTechnique/SAMSUNG/PAC AIR EAU/ClimateHub.pdf"}

        ]

      }
    ]
  },
  {
    name :"THALEOS",
    logo :"/images/brands/Thaleos.png",
    products :[
      {
        name:"Micro Onduleur",
        category :"MO",
        models : [
          {name : "Thaleos-Micro-Onduleur-Transformer", docUrl : "/documents/DocTechnique/THALEOS/MICRO ONDULEUR/Thaleos-Micro-Onduleur-Transformer.pdf"}
        ]

      },
      {
        name :"Poêle à Granulés",
        category: "POE",
        models:[
          {name:"Warme 8 et 10 kW", docUrl :"/documents/DocTechnique/THALEOS/POE/Warme 8 et 10 kW.pdf"}
        ]
      },
      {
        name:"Panneau Photovoltaique",
        category : "PV",
        models :[
          {name :"PX ROUGE-375WC ", docUrl : "/documents/DocTechnique/THALEOS/PV/THALEOS PX ROUGE-375WC.pdf"},
          {name:"PV Panda BF-425WC" , docUrl : "/documents/DocTechnique/THALEOS/PV/Thaleos - PV Panda BF .pdf"},
          {name:"PV Panda Pro-500WC", docUrl : "/documents/DocTechnique/THALEOS/PV/Thaleos-PV-Panda-Pro-500.pdf"},
        ]
      },
      {
        name:"Chauffe Eau Solaire",
        category : "CES",
        models : [
          {name:"Solar Wave 140L" , docUrl: "/documents/DocTechnique/THALEOS/CES/Solar-Wave-140L.pdf"}
        ]
      },
      {
        name:"Chaffe-eau thermodynamique",
        category:"BTD",
        models:[
          {name:"chauffe-eau-thermodynamique-200l-270l",docUrl:"/documents/DocTechnique/THALEOS/BTD/chauffe-eau-thermodynamique-200l-270l.pdf"},
          {name:"Ballon-thermodynamique-Performer-2-200-270L", docUrl :"/documents/DocTechnique/THALEOS/BTD/Ballon-thermodynamique-Performer-2-200-270L.pdf"}
        ]
      }

    ]

  },
  {
    name : "THERMADOR",
    logo : "/images/brands/thermador.png",
    products :[
      {
        name:"système solaire combiné",
        category : "SSC",
        models : [
          {name: "Pack E - 400L - 3 panneaux" , docUrl :"/documents/DocTechnique/THERMADOR/SSC/Pack E - 400L - 3 panneaux.pdf"}
        ]
      }
    ]
  },
  {
    name: "THERMOR",
    logo : "/images/brands/thermor.jpg",
    products : [
      {
        name:"Chaffe-eau thermodynamique",
        category :"BTD",
        models:[
          {name:"Aeromax-split-2",docUrl:"/documents/DocTechnique/THERMOR/BTD/Aeromax-split-2.pdf"},
          {name:"Aeromax-5", docUrl :"/documents/DocTechnique/THERMOR/BTD/Aeromax-5.pdf"}
        ]
      }

    ]
  },
  {
    name : "THOMSON",
    logo : "/images/brands/thomson.png",
    products : [
      {
        name : "Panneau Photovoltaique",
        category : "PV",
        models : [
          {name : "Aton 375", docUrl: "/documents/DocTechnique/THOMSON/PV/Fiche PV ATON 375.pdf"},
          {name: "Aton 500", docUrl : "/documents/DocTechnique/THOMSON/PV/Fiche PV ATON 500.pdf" },
          {name :"Ecosun 375", docUrl :"/documents/DocTechnique/THOMSON/PV/Fiche PV Ecosun 375.pdf"},
          {name :"Ecosun 400", docUrl : "/documents/DocTechnique/THOMSON/PV/Fiche PV Ecosun 400.pdf"},
          {name: "Ecosun 500", docUrl :"/documents/DocTechnique/THOMSON/PV/Fiche PV Ecosun 500.pdf"},
          {name:"Sunext 375", docUrl : "/documents/DocTechnique/THOMSON/PV/Fiche PV Sunext 375.pdf"},
          {name:"Raia 375", docUrl : "/documents/DocTechnique/THOMSON/PV/Fiche Raia 375.pdf"}
        ]
      },
      {
        name : "Pompe à Chaleur Air Eau",
        category : "PAC",
        models : [
          {name : "ETHER & ETHER DUO", docUrl :"/documents/DocTechnique/THOMSON/PAC AIR EAU/ETHER & ETHER DUO.pdf"},
          {name : "ETHER R32 SPLIT 65°C" , docUrl :"/documents/DocTechnique/THOMSON/PAC AIR EAU/ETHER R32 SPLIT 65°C.pdf"}
        ]
      }

    ]
  },
  {
    name : "TOSHIBA",
    logo : "/images/brands/toshiba.png",
    products : [
      {
        name : "Pompe à Chaleur Air Air",
        category : "PAC",
        models:[
          {name: "Seiya" , docUrl :"/documents/DocTechnique/TOSHIBA/PAC AIR AIR/Seiya.pdf"}
        ]
      },
      {
        name:"Pome à Chaleur Air Eau",
        category : "PAC",
        models :[
          {name:"Estia murale 8kw",docUrl:"/documents/DocTechnique/TOSHIBA/PAC AIR EAU/Estia murale 8kw.pdf"}
        ]
      }

    ]
  },
  {
    name : "ECOYA",
    logo: "/images/brands/ecoya.png",
    products : [
      {
        name : "Chaudière à Granulés",
        category : "CHAUD",
        models : [
          {name :"CEC 24", docUrl :"/documents/DocTechnique/ECOYA/CHAUD/Folheto-CEC24.pdf"},
               ]
      },
      {
        name : "Système Solaire Combiné",
        category : "SSC",
        models : [
          {name :"SSC 406L", docUrl :"/documents/DocTechnique/ECOYA/SSC/SSC 406L.pdf"}
        ]
      },
      {
        name:"Pompe à Chaleur Air Eau",
        category : "PAC",
        models:[
          {name: "ETX - MONO", docUrl:"/documents/DocTechnique/ECOYA/PAC AIR EAU/ETX - MONO.pdf"}
        ]

      }

    ]
  },
  {
    name : "ENPHASE",
    logo : "/images/brands/ENPHASE.png",
    products : [
      {
        name : "MICRO ONDULEUR",
        category : "MO",
        models :
         [
          {name : "IQ7-IQ7plus",docUrl : "/documents/DocTechnique/ENPHASE/MICRO ONDULEUR/IQ7-IQ7plus-DS-FR-FR_0.pdf"}
         ]
      }

    ]
  },
  {
    name : "STOVE ITALIA",
    logo : "/images/brands/stove-italia.png",
    products : [
      {
        name :"Poêle à Granulés",
        category:"POE",
        models:[
          {name:"Diego 9 concentrique",docUrl:"/documents/DocTechnique/STOVE ITALIA/POE/Diego 9 concentrique.pdf"}
        ]
      }

    ]
  },
  {
    name :"Alfa Plam",
    logo: "/images/brands/AlfaPlam.jpeg",
    products:[
      {
        name : "Chaudière à Granulés",
        category : "CHAUD",
        models :[
          {name : "LECO 23" ,docUrl :"/documents/DocTechnique/Alfa Plam/CHAUD/FICHE TECHNIQUE LECO 23.pdf"}
        ]
      }

    ]
  },
  {
    name :"fhe Group",
    logo :"/images/brands/fhe.png",
    products:[
      {
        name:"Système Solaire Combiné",
        category:"SSC",
        models:[
          {name:"TKS 500/150",docUrl:"/documents/DocTechnique/FHE/BTD/TKS 500_150.pdf"},
          {name :"TKS 420/140" ,docUrl :"/documents/DocTechnique/FHE/BTD/TKS 420-140.pdf"},
          {name: "TKS 500", docUrl :"/documents/DocTechnique/FHE/BTD/TKS 500.pdf"}

        ]
      }
    ]
  }
 // brands
];

export interface TechnicalDocModalRef {
  onOpen: () => void;
}

const TechnicalDocModal = forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBrand, setSelectedBrand] = useState<typeof BRANDS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = BRANDS.filter(brand => 
    brand.name.toLowerCase().startsWith(searchQuery.toLowerCase()) // Changed to startsWith
  );

  useImperativeHandle(ref, () => ({
    onOpen,
  }));

  const handleClose = () => {
    setSelectedBrand(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="full" isCentered>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent mx={{ base: 4, md: 200 }} my={{ base: 4, md: 80 }} p={6} height="100vh">
        <ModalHeader fontSize={{ base: "2xl", md: "3xl" }}>
          {selectedBrand ? (
            <Box display="flex" alignItems="center" gap={4}>
              <Box 
                cursor="pointer" 
                onClick={() => setSelectedBrand(null)}
                color="navy"
                fontWeight="bold"
                fontSize={{ base: "3xl", md: "50" }}
                position="relative"
              >
                Fiche technique
                <Box 
                  position="absolute" 
                  bottom="-5px" 
                  left="0" 
                  width="40px" 
                  height="4px" 
                  bgGradient="linear(to-r, #26DDB4, #09B7F6)"
                  borderRadius="full"
                />
              </Box>
              <Text>›</Text>
              <Text
              fontSize={{ base: "3xl", md: "50" }}>{selectedBrand.name}</Text>
            </Box>
          ) : (
            <Box 
              color="navy"
              fontWeight="bold"
              fontSize={{ base: "3xl", md: "50" }}
              position="relative"
            >
              Fiche technique
              <Box 
                position="absolute" 
                bottom="-5px" 
                left="0" 
                width="40px" 
                height="4px" 
                bgGradient="linear(to-r, #26DDB4, #09B7F6)"
                borderRadius="full"
              />
            </Box>
          )}
        </ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <ModalBody pb={8} overflowY="auto">
          {/* This section is now always visible */}
          <Box display="flex" flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" alignItems="center" mb={8}>
            <Box maxW="100%">
              <Text 
                color="#2E3A59"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.8"
                fontWeight="normal"
              >
                Découvrez l'ensemble de nos produits et accédez<br/>
                facilement à toutes leurs fiches techniques détaillées.
              </Text>
            </Box>
            <Box mt={{ base: 4, md: 0 }} maxW="100%">
              <img 
                src="/images/carte mere.png" 
                width="100%" // Ensures the image takes the full width of its container
                style={{ borderRadius: '10px', maxWidth: '700px', height: 'auto' }} // Increase maxWidth for larger screens
                alt="Carte Mère" // Add an alt attribute for accessibility
              />
            </Box>
          </Box>
          {/* Conditional rendering for brand selection */}
          {!selectedBrand ? (
            <>
              <Box position="relative" mb={8}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Image 
                      src="/icons/search.svg"
                      alt="Search Icon"
                      boxSize={5}
                    />
                  </InputLeftElement>
                  <Input 
                    placeholder="Rechercher" 
                    bg="gray.100"
                    border="none"
                    rounded="md"
                    pl={10}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    _focus={{ boxShadow: "0 0 0 2px #09B7F6" }}
                  />
                </InputGroup>
              </Box>

              <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={6}>
                {filteredBrands.map((brand) => (
                  <Box
                    key={brand.name}
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    rounded="md"
                    cursor="pointer"
                    _hover={{ shadow: "lg", transform: "scale(1.1)" }} // Add scale transform on hover
                    transition="all 0.3s ease" // Smooth transition for the hover effect
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    h="100px"
                    onClick={() => setSelectedBrand(brand)}
                  >
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      maxH="60px"
                      objectFit="contain"
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </>
          ) : (
            <Box>
              {selectedBrand.products.map((product) => (
                <Box key={product.name} mb={8}>
                  <Box display="flex" alignItems="center" gap={4} mb={4}>
                    <Image
                      src={`/images/categories/${product.category.toLowerCase()}.png`}
                      alt={product.category}
                      w="40px"
                      h="40px"
                    />
                    <Text fontSize="xl" fontWeight="bold">
                      {product.name}
                    </Text>
                  </Box>
                  <Table variant="simple" borderRadius="md" overflow="hidden">
                    <Thead bg="navy">
                      <Tr>
                        <Th color="white" >Modèle</Th>
                        <Th color="white" textAlign="right">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {product.models.map((model) => (
                        <Tr key={model.name}>
                          <Td borderRadius="md">{model.name}</Td>
                          <Td textAlign="right" borderRadius="md">
                            <Box display="flex" gap={4} justifyContent="flex-end">
                              <Icon 
                                as={FaEye} 
                                color="teal.500" 
                                cursor="pointer"
                                onClick={() => window.open(model.docUrl, '_blank')}
                              />
                              <Icon 
                                as={FaDownload} 
                                color="teal.500" 
                                cursor="pointer"
                                onClick={() => window.open(model.docUrl, '_blank')}
                              />
                            </Box>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  
                </Box>
              ))}
            </Box>
            
          )}
          
        </ModalBody>
        <Box display="flex" justifyContent="center" p={4}>
            {selectedBrand && (
              <Button 
            colorScheme="teal"
            borderRadius="full" // Makes the button fully rounded
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)" // Adds shadow for depth
            px={20} // Adds horizontal padding
            py={6} // Adds vertical padding
            fontWeight="bold" // Ensures the text is bold
            onClick={() => setSelectedBrand(null)}>
                Retour
              </Button>
            )}
          <Button
            colorScheme="teal"
            onClick={handleClose}
            borderRadius="full" // Makes the button fully rounded
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)" // Adds shadow for depth
            px={20} // Adds horizontal padding
            py={6} // Adds vertical padding
            fontWeight="bold" // Ensures the text is bold
          >
            FERMER
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
});

TechnicalDocModal.displayName = "TechnicalDocModal";
export default TechnicalDocModal;