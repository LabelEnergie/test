import { Center, CenterProps, Text } from "@chakra-ui/react";

interface StatusProps extends CenterProps {
  color: string;
  label: string;
}

export default function Status(props: StatusProps) {
  const { color, label, ...rest } = props;

  return (
    <Center
      bg={color}
      rounded="md"
      px={3}
      minW="150px"
      py={1}
      w="fit-content"
      {...rest}
    >
      <Text color="white" fontWeight={800}>
        {label}
      </Text>
    </Center>
  );
}
