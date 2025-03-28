import { BoxProps } from "@chakra-ui/react";
import FAQCollapseButton from "../Sections/FAQSection/FAQColapseButton";

interface XProps extends BoxProps {}

export default function X(props: XProps) {
  return (
    <FAQCollapseButton
      isExpanded={false}
      transform="rotate(45deg)"
      cursor="pointer"
      {...props}
    />
  );
}
