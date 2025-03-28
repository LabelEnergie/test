import { Wrap, WrapItem, WrapProps } from "@chakra-ui/react";
import DownloadButton from ".";

export default function DownloadButtons(props: WrapProps) {
  return (
    <Wrap spacing={{ base: 4, lg: 7 }} mt={{ base: 4, lg: 10 }} {...props}>
      <WrapItem>
        <DownloadButton type="apple" />
      </WrapItem>
      <WrapItem>
        <DownloadButton type="google" />
      </WrapItem>
    </Wrap>
  );
}
