import { Text, TextProps } from "@chakra-ui/react";
import { High } from "./High";
import { Fragment } from "react";
import Link from "next/link";

interface TextHighlighterProps extends TextProps {
  children: string;
  colorHighlight?: string;
}

export default function TextHighlighter(props: TextHighlighterProps) {
  const { children, colorHighlight = "inherit", ...rest } = props;

  return (
    <Text {...rest}>
      {children.split("\n").map((text, i) => (
        <Fragment key={i}>
          {text.split("==").map((item, index) =>
            index % 2 === 0 ? (
              item.split("**").map((item, index) => {
                return index % 2 === 0 ? (
                  item.split("[Link]").map((item, index) => {
                    return index % 2 === 0 ? (
                      <Fragment key={index}>{item}</Fragment>
                    ) : (
                      <Text
                        as={Link}
                        href={item.split("|")[0]}
                        color="theme.400"
                        fontWeight={600}
                        textDecorationLine="underline"
                      >
                        {item.split("|")[1]}
                      </Text>
                    );
                  })
                ) : (
                  <High key={index} color={colorHighlight}>
                    {item}
                  </High>
                );
              })
            ) : (
              <High key={index} color={colorHighlight}>
                {item}
              </High>
            )
          )}
          <br />
        </Fragment>
      ))}
    </Text>
  );
}
