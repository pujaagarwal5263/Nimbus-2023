import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
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
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const CodingIllustration = require("../images/coding_illustration.jpeg");

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleAuth = async () => {
    await loginWithRedirect();
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box bg="white" minH="100vh">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        p="4"
        bg="transparent" // Set background color to transparent
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1)" // Add box shadow
      >
        <Text fontSize="xl" fontWeight="bold" color="black">
          Nimbus 2023 👨‍💻
        </Text>{" "}
        {/* Change text color to black */}
      </Flex>

      {/* Hero Section */}
      <Center py="10">
        <Container maxW="container.xl">
          <Grid templateColumns="1fr 1fr" gap={10}>
            <GridItem>
              <Heading as="h1" size="2xl" color="black">
                Welcome to Nimbus '23
              </Heading>
              <Text fontSize="xl" mt="4" color="black">
                Your Coding Companion
              </Text>
              <Text fontSize="lg" mt="6" color="gray.600">
                Nimbus is a coding platform that helps you learn, visualize your
                performance, and solve coding problems with the power of AI
                assistance.
              </Text>
              <Button
                colorScheme="blue"
                size="lg"
                mt="8"
                mr="4"
                px="8"
                _hover={{ bg: "black", color: "white" }}
                onClick={handleAuth}
                bgColor="white" // Set background color to black
                color="black" // Set text color to white
                border="1px solid black"
              >
                Ready to Ride Nimbus '23 🧙🧹
              </Button>
            </GridItem>
            <GridItem>
              <Image
                src={CodingIllustration} // Replace with your illustration/image URL
                alt="Coding Illustration"
                w="50%"
                borderRadius={5}
              />
            </GridItem>
          </Grid>
        </Container>
      </Center>

      {/* Features Section */}
      <Center py="13">
        <Container maxW="container.lg">
          <Heading as="h2" size="xl" textAlign="center" color="black">
            Key Features
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="10">
            {/* Feature 1 */}
            <GridItem>
              <Box
                p="4"
                bg="white"
                color="black"
                boxShadow="5px 5px 5px rgba(0, 0, 0, 0.1)"
                borderRadius="lg"
              >
                <Heading as="h3" size="lg">
                  Write Code
                </Heading>
                <Text fontSize="md">
                  Start writing and executing code using our user-friendly
                  coding editor.
                </Text>
              </Box>
            </GridItem>
            {/* Feature 2 */}
            <GridItem>
              <Box
                p="4"
                bg="white"
                color="black"
                boxShadow="5px 5px 5px rgba(0, 0, 0, 0.1)"
                borderRadius="lg"
              >
                <Heading as="h3" size="lg">
                  Visualize
                </Heading>
                <Text fontSize="md">
                  Visualize your performance on your dashboard
                </Text>
              </Box>
            </GridItem>
            {/* Feature 3 */}
            <GridItem>
              <Box
                p="4"
                bg="white"
                color="black"
                boxShadow="5px 5px 5px rgba(0, 0, 0, 0.1)"
                borderRadius="lg"
              >
                <Heading as="h3" size="lg">
                  AI Assistance
                </Heading>
                <Text fontSize="md">
                  Get AI-powered assistance to learn coding and improve your
                  skills.
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Center>
      <Center mt={10}>
        <Text fontSize="md" color="gray.500">
        Nimbus'23: Fueling Technology with Code 👨‍💻
        </Text>
      </Center>
    </Box>
  );
};

export default LandingPage;
