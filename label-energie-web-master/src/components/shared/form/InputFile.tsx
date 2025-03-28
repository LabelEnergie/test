import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Box,
  BoxProps,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getIconByFile } from "@/utils/file";
import { useFieldError } from "./form";
import { wrapText } from "@/utils/string";

interface InputFileProps extends BoxProps {
  name: string;
  onChangeFiles?(file?: File): void;
  accept?: string[]; // extensions with .
  label?: string;
  multi?: boolean;
  displayPreview?: boolean;
  isDisabled?: boolean;
}

interface FileCustom extends File {
  href?: string;
}

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  (props, ref) => {
    const {
      name,
      onChangeFiles,
      accept,
      label,
      multi = true,
      displayPreview,
      isDisabled,
      ...rest
    } = props;

    const [file, setFile] = useState<FileCustom>();
    const [pickedImgUrl, setPickedImgUrl] = useState("");

    const { setValue, getValues } = useFormContext();
    const error = useFieldError(name);

    const [dragActive, setDragActive] = useState(false);

    function onDrop(event: React.DragEvent<HTMLDivElement>) {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(false);
      const files = event.dataTransfer.files;
      if (files && files[0]) {
        onAddFile(files[0]);
      }
    }

    function onDragOver(event: React.DragEvent<HTMLDivElement>) {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(true);
    }

    function onDragLeave(event: React.DragEvent<HTMLDivElement>) {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(false);
    }

    function onAddFile(newFile: File) {
      const splitted = newFile.name.split(".");
      if (
        accept != undefined &&
        !accept.includes(`.${splitted[splitted.length - 1]}`)
      ) {
        return;
      }

      setFile(newFile);
      onChangeFiles?.(newFile);
      setValue(name, newFile);
      if (displayPreview) {
        setPickedImgUrl(URL.createObjectURL(newFile));
      }
    }

    function onRemoveFile(index: number) {
      // const result = files.filter((_, i) => i != index);

      setFile(undefined);
      onChangeFiles?.(undefined);
      setValue(name, null);
      setPickedImgUrl("");
    }

    useEffect(() => {
      // Default file & watch external changes (reset form only)
      const currentFile = getValues(name);

      if (typeof currentFile == "string") {
        if (displayPreview) {
          setPickedImgUrl(currentFile);
        } else {
          setFile({
            name: currentFile.split("/")[currentFile.split("/").length - 1],
            size: 0,
            href: currentFile,
          } as FileCustom);
        }
      } else {
        try {
          if (currentFile.name == undefined) {
            setFile(undefined);
          }
        } catch {}
      }
    }, [getValues(name)]);

    return (
      <Box {...rest}>
        {pickedImgUrl ? (
          <Box position="relative" w="fit-content">
            <Image src={pickedImgUrl} h="250px" rounded="md" />
            <Image
              src="/icons/x.svg"
              boxSize="25px"
              onClick={() => onRemoveFile(0)}
              cursor="pointer"
              position="absolute"
              top={1}
              right={1}
            />
          </Box>
        ) : (
          <>
            <Box
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              border="2px dashed"
              borderColor={error ? "red" : dragActive ? "blue.500" : "gray.200"}
              borderRadius="md"
              padding={7}
              textAlign="center"
              position="relative"
              h="120px"
            >
              <input
                ref={ref}
                type="file"
                disabled={isDisabled || file != undefined}
                onChange={(e) => {
                  if (e.target.files) {
                    onAddFile(e.target.files[0]);
                  }
                }}
                multiple={false}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: file ? "default" : "pointer",
                  zIndex: isDisabled || file != undefined ? -1 : 0,
                }}
                accept={accept?.join(",")}
              />
              {label && (
                <Text fontWeight={700} mb={2}>
                  {label}
                </Text>
              )}

              {file ? (
                <>
                  <HStack
                    key={file.name + "-" + file.size}
                    w="fit-content"
                    mx="auto"
                  >
                    <Image src={getIconByFile(file.name)} boxSize="32px" />
                    <Text
                      {...(file.href && {
                        as: Link,
                        target: "_blank",
                        href: file.href,
                      })}
                    >
                      {wrapText(file.name, 25)}
                    </Text>
                  </HStack>
                  <Box
                    bg="primary"
                    position="absolute"
                    top={-1}
                    left={-1}
                    right={-1}
                    h="20px"
                    roundedTop="md"
                  />
                </>
              ) : (
                <Text color={error ? "red" : "black"}>
                  {dragActive
                    ? "Déposez le fichier ici"
                    : "Glissez ou déposer un fichier"}
                </Text>
              )}
              {file && !isDisabled && (
                <Image
                  src="/icons/x.svg"
                  boxSize="25px"
                  onClick={() => {
                    onRemoveFile(0);
                  }}
                  cursor="pointer"
                  position="absolute"
                  top={5}
                  right={{ base: 2, lg: 5 }}
                />
              )}
            </Box>
            {/* <VStack my={3} align="stretch">
              {files.map((file, i) => (
                <HStack key={file.name + "-" + file.size}>
                  <Image src={getIconByFile(file.name)} boxSize="32px" />
                  <Text
                    {...(file.href && {
                      as: Link,
                      target: "_blank",
                      href: file.href,
                    })}
                  >
                    {file.name}
                  </Text>
                  <Image
                    src="/icons/x.svg"
                    boxSize="25px"
                    onClick={() => {
                      onRemoveFile(i);
                    }}
                    cursor="pointer"
                  />
                </HStack>
              ))}
            </VStack> */}
          </>
        )}
        {error?.message && !file && (
          <Text color="red" mt={1}>
            {error.message}
          </Text>
        )}
      </Box>
    );
  }
);
