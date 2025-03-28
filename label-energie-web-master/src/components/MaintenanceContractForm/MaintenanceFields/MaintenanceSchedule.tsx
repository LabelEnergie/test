import { forwardRef, useMemo, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { colors } from "@/style/colors";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  format,
  nextMonday,
} from "date-fns";
import { useFieldError } from "@/components/shared/form/form";
import { useFormContext } from "react-hook-form";
import { fr } from "date-fns/locale";
import { capitalize } from "@/utils/string";

export interface MaintenanceScheduleProps {
  isRequired?: boolean;
  name: string;
}

export const MaintenanceSchedule = forwardRef<
  HTMLDivElement,
  MaintenanceScheduleProps
>(({ isRequired, name }, ref) => {
  const error = useFieldError(name);

  const { watch, setValue } = useFormContext();
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>(
    watch(name) || ""
  );

  const schedule = useMemo(() => generateMaintenanceSchedule(), []);

  function handleClick(value: string) {
    setSelectedTimeslot(value);
    setValue(name, value);
  }

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} ref={ref}>
      <Box
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        overflowX="auto"
        maxW={{ base: "270px", sm: "full" }}
        mx={{ base: "auto" }}
      >
        <Flex>
          {schedule.map((daySchedule) => {
            const dayFormated = format(daySchedule.date, "yyyy-MM-dd");

            return (
              <Box key={daySchedule.date.toISOString()} flex="1">
                <Box bg="#9ce2fb" color="king" p={2} textAlign="center">
                  <Text>
                    {capitalize(
                      format(daySchedule.date, "EEEE", { locale: fr })
                    )}
                  </Text>
                  <Text fontSize={{ base: "11px", sm: "sm" }}>
                    {capitalize(
                      format(daySchedule.date, "dd MMM", { locale: fr })
                    )}
                  </Text>
                </Box>
                <Flex flexDirection="column" p={2}>
                  {daySchedule.timeslots.map((timeslot) => {
                    const dayWithTSFormatted = `${dayFormated}|${timeslot}`;
                    return (
                      <Box
                        key={timeslot}
                        onClick={() => handleClick(dayWithTSFormatted)}
                        py={1}
                        my={1}
                        mx="auto"
                        textAlign="center"
                        borderWidth={2}
                        borderRadius="md"
                        w="70px"
                        borderColor={
                          selectedTimeslot === dayWithTSFormatted
                            ? colors.secondary
                            : "gray.200"
                        }
                        cursor="pointer"
                        fontSize={13}
                      >
                        {timeslot}
                      </Box>
                    );
                  })}
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </Box>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
});

export const generateMaintenanceSchedule = () => {
  const today = new Date();
  const startDate = nextMonday(addMonths(today, 2));
  const endDate = addDays(startDate, 4);

  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const schedule = allDays.map((day) => ({
    date: day,
    timeslots: ["8h - 12h", "14h - 18h"],
  }));

  return schedule;
};
