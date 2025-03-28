import { Box, BoxProps, Center, Image, Text } from "@chakra-ui/react";

interface ProfileImageProps extends BoxProps {
  src?: string;
  size?: number;
}

export default function ProfileImage(props: ProfileImageProps) {
  const { src, size = 90, ...rest } = props;

  return (
    <Center
      w={`${size}px`}
      minW={`${size}px`}
      h={`${size}px`}
      minH={`${size}px`}
      rounded="full"
      overflow="hidden"
      {...rest}
    >
      {src ? (
        <Image 
          src={src} 
          w="full" 
          h="full" 
          objectFit="cover" 
          alt="Profile picture"
        />
      ) : (
        <Image
          src="/icons/espace_client.png"
          w="full"
          h="full"
          objectFit="cover"
          alt="Default profile picture"
        />
      )}
    </Center>
  );
}
