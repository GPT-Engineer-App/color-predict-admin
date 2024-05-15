import React, { useState } from "react";
import { Container, VStack, Text, Button, Box, Input, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaCog, FaCheck, FaTimes } from "react-icons/fa";

const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

const AdminPanel = ({ setColor, setAdminMode }) => {
  const [inputColor, setInputColor] = useState("");
  const toast = useToast();

  const handleSetColor = () => {
    if (colors.includes(inputColor.toLowerCase())) {
      setColor(inputColor.toLowerCase());
      toast({
        title: "Color set successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid color.",
        description: `Please choose from: ${colors.join(", ")}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4}>
      <HStack>
        <Input placeholder="Enter color" value={inputColor} onChange={(e) => setInputColor(e.target.value)} />
        <IconButton aria-label="Set Color" icon={<FaCheck />} onClick={handleSetColor} />
        <IconButton aria-label="Exit Admin" icon={<FaTimes />} onClick={() => setAdminMode(false)} />
      </HStack>
    </VStack>
  );
};

const ColorPredictionGame = () => {
  const [color, setColor] = useState("");
  const [guess, setGuess] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const toast = useToast();

  const handleGuess = () => {
    if (guess.toLowerCase() === color) {
      toast({
        title: "Correct!",
        description: "You guessed the right color!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Wrong!",
        description: `The correct color was ${color}.`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setGuess("");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {adminMode ? (
        <AdminPanel setColor={setColor} setAdminMode={setAdminMode} />
      ) : (
        <VStack spacing={4}>
          <Text fontSize="2xl">Color Prediction Game</Text>
          <Button leftIcon={<FaCog />} onClick={() => setAdminMode(true)}>
            Admin Panel
          </Button>
          <HStack>
            <Input placeholder="Guess the color" value={guess} onChange={(e) => setGuess(e.target.value)} />
            <Button onClick={handleGuess}>Submit</Button>
          </HStack>
        </VStack>
      )}
    </Container>
  );
};

const Index = () => {
  return <ColorPredictionGame />;
};

export default Index;
