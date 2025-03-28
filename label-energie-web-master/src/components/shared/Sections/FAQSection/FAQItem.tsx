import {
  AccordionButton,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
} from "@chakra-ui/react";
import TextHighlighter from "../../TextHighlighter";
import FAQCollapseButton from "./FAQColapseButton";
import Heading from "../../Heading";

interface FAQItemProps extends AccordionItemProps {
  title: string;
  response: string;
}

export default function FAQItem(props: FAQItemProps) {
  const { response, title, ...rest } = props;

  return (
    <AccordionItem boxShadow="md" rounded="xl" my={5} {...rest}>
      {({ isExpanded }) => (
        <>
          <AccordionButton pl={7} py={4} rounded="xl">
            <Heading as="h3" textAlign="left" flex={1} fontSize={20} pr={3}>
              {title}
            </Heading>
            <FAQCollapseButton isExpanded={isExpanded} />
          </AccordionButton>
          <AccordionPanel px={7} pt={5}>
            <TextHighlighter>{response}</TextHighlighter>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
