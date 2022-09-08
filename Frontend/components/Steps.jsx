/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Box, Text, Grid, Link } from "@chakra-ui/react";
export default function Steps() {
  const Step = ({ step, title, description }) => {
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

  return (
    <Box
      id="steps"
      position="relative"
      zIndex={2}
      w="full"
      opacity="0.97"
      bg="linear-gradient(292.63deg, #00254A -20.23%, #000012 88.04%)"
      mx="auto"
      py="20"
    >
      <Box mb="10">
        <Text color="white" align="center" fontWeight="bold" fontSize="4xl">
          How it works
        </Text>
      </Box>
      <Grid
        mt="2"
        px="10"
        maxW="6xl"
        mx="auto"
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap="10"
        w="full"
      >
        <Step
          title="Make a Donation"
          step="1"
          description={
            <>
              {" "}
              Donate to a fundraiser by simply clicking on "view more" button
              below the fundraiser card. which will take you to the fundraiser
              page for you to make your donations, and print the receipts.
            </>
          }
        />
        <Step
          title="Create a Fundraiser"
          step="2"
          description={
            <>
              You can create a fundraiser by clicking on the "Create" button at
              the Navbar, that will take you to the 'Create new fundraiser' page
              where you will need to fill the information about the fundraiser
              you want create.
            </>
          }
        />
        <Step
          title="Send CELO"
          step="3"
          description={
            <>
              You can send CELO to anyone across the world with our DApp by
              clicking on the "Profile" at the navBar. there, you can send CELO,
              view your balance and your transaction counts.
            </>
          }
        />
      </Grid>
    </Box>
  );
}
