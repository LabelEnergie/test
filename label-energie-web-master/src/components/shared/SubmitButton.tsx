import { ReactNode } from "react";
import { ButtonProps } from "@chakra-ui/react";
import Button from "./Button";

interface SubmitButtonProps extends ButtonProps {
  children: ReactNode;
  isSubmitting?: boolean;
}

export function SubmitButton(props: SubmitButtonProps) {
  const { children, ...rest } = props;

  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  );
}
