import { Flex, Box, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  step: any;
  description: string;
}

const Step = ({ step, title, description }: Props) => {
  return (
    <Flex
      direction="column"
      bg="whiteAlpha.100"
      cursor="pointer"
      _hover={{ bg: "whiteAlpha.200" }}
      transitionDuration="200ms"
      p="10"
      rounded="xl"
    >
      <Box
        bg="brand.blue"
        border="4px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        rounded="full"
        w="12"
        h="12"
        fontSize="xl"
        fontWeight="bold"
        color="white"
        p="2"
        borderColor="whiteAlpha.500"
      >
        {step}
      </Box>
      <Box mt="2">
        <Text fontWeight="bold" fontSize="2xl" color="white">
          {title}
        </Text>
        <Text mt="1" color="whiteAlpha.600">
          {description}
        </Text>
      </Box>
    </Flex>
  );
};

export default Step;
