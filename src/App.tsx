import React from 'react';
import SeedForm from "./SeedForm";
import './App.css';
import { Card, CardHeader, ChakraProvider, Container, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { theme } from './theme/theme';
import Bg from './assets/fox-bg.jpeg'
import { FaGithub } from 'react-icons/fa'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDir='column' p={8} className="App" bgImage={Bg} backgroundSize='cover' minHeight='100vh'>
        <Container mb={6} my='auto'>
          <Card backdropFilter='blur(50px)' overflow='hidden' borderWidth={1}>
            <CardHeader px={8} pt={8} pb={0}>
              <Heading fontSize='2xl'>Decrypt Secret Recovery Phrase</Heading>
              <Text mt={2} color='text.subtle' fontSize='sm' fontWeight='medium'>If you received an email from ShapeShift with an encrypted wallet string, paste the string along with the email and password you set when your wallet was created to view your Secret Recovery Phrase.</Text>
            </CardHeader>
          <SeedForm />
          </Card>
        </Container>
        <Link fontSize='xl' mt='auto' mx='auto' isExternal href='https://github.com/shapeshift/mnemonic-recovery-ui'>
          <FaGithub />
        </Link>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
