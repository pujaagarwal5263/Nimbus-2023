import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Image,
  Container,
  Grid,
  GridItem,
  Flex
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box bg="gray.100" minH="100vh">
       <Flex
        as="nav"
        align="center"
        justify="space-between"
        p="4"
        bg="blue.500"
        color="white"
      >
        <Text fontSize="xl" fontWeight="bold">
          Nimbus 2023
        </Text>
      </Flex>
      {/* Hero Section */}
      <Center py="10">
        <Container maxW="container.xl">
          <Grid templateColumns="1fr 1fr" gap={10}>
            <GridItem>
              <Heading as="h1" size="2xl">
                Welcome to Nimbus 2023
              </Heading>
              <Text fontSize="xl" mt="4">
                Your Coding Companion
              </Text>
              <Text fontSize="lg" mt="6">
                Nimbus is a coding platform that helps you learn, visualize your performance,
                and solve coding problems with the power of AI assistance.
              </Text>
           
                <Button
                  colorScheme="blue"
                  size="lg"
                  mt="8"
                  mr="4"
                  px="8"
                  _hover={{ bg: "blue.600" }}
                >
                  Login with Auth0
                </Button>
           
            </GridItem>
            <GridItem>
              <Image
                src="/coding-illustration.svg" // Replace with your illustration/image URL
                alt="Coding Illustration"
                w="100%"
              />
            </GridItem>
          </Grid>
        </Container>
      </Center>

      {/* Features Section */}
      <Center py="16">
        <Container maxW="container.lg">
          <Heading as="h2" size="xl" textAlign="center">
            Key Features
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="10">
            {/* Feature 1 */}
            <GridItem>
              <Heading as="h3" size="lg">
                Write Code
              </Heading>
              <Text fontSize="md">
                Start writing and executing code using our user-friendly
                coding editor.
              </Text>
            </GridItem>
            {/* Feature 2 */}
            <GridItem>
              <Heading as="h3" size="lg">
                Visualize
              </Heading>
              <Text fontSize="md">
                Visualize your performance on your dashboard
              </Text>
            </GridItem>
            {/* Feature 3 */}
            <GridItem>
              <Heading as="h3" size="lg">
                AI Assistance
              </Heading>
              <Text fontSize="md">
                Get AI-powered assistance to solve coding challenges and
                improve your skills.
              </Text>
            </GridItem>
          </Grid>
        </Container>
      </Center>
    </Box>
  );
};

export default LandingPage;
