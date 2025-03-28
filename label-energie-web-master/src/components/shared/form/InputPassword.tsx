import { Image } from "@chakra-ui/react";
import { Input, InputProps } from "./Input";
import { forwardRef, useState } from "react";

interface InputPasswordProps extends InputProps {}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    const { type, ...rest } = props;

    const [isVisible, setIsVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={isVisible ? "text" : "password"}
        rightIcon={
          <Image
            src={`/icons/oeil${isVisible ? "-barre" : ""}.svg`}
            cursor="pointer"
            onClick={() => setIsVisible((v) => !v)}
          />
        }
        {...rest}
      />
    );
  }
);
