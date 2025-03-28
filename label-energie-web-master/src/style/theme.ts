import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  colors,
  components: {
    Heading: {
      defaultProps: {
        size: { base: "lg", lg: "xl" },
      },
    },
    Table: {
      variants: {
        simple: {
          table: {
            borderTopRadius: "md",
            overflow: "hidden",
          },
          thead: {
            bg: "king",
            tr: {
              td: {
                color: "white",
                fontWeight: 800,
                fontSize: 14,
              },
            },
          },
          tbody: {
            borderWidth: 1,
            borderColor: "gray.200",
            tr: {
              cursor: "pointer",
              td: {
                py: "20px",
                color: "king",
                fontWeight: 600,
              },
            },
          },
        },
      },
    },
  },
  styles: {
    global: {
      "input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active":
        {
          transition: "background-color 10000s ease-in-out 0s",
          webkitTextFillColor: "white !important",
        },
    },
  },
});
