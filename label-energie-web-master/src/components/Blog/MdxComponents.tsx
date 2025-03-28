import Heading from "../shared/Heading";
import { High as CustomHigh } from "../shared/High";
import { Image, ImgProps, Text, TextProps } from "@chakra-ui/react";

export const mdxComponents = {
  High,
  img: ({ alt, ...rest }: ImgProps) => (
    <Image {...rest} alt={alt} title={alt} />
  ),
  h1: (props: TextProps) => (
    <Text
      as={"h2"}
      fontSize={{ base: "30px !important", lg: "40px !important" }}
      color="king !important"
      fontWeight={"800 !important"}
      {...props}
    />
  ),
};

function High({ children }: { children: string }) {
  return (
    <CustomHigh color={"primary"} size={18}>
      {children}
    </CustomHigh>
  );
}
