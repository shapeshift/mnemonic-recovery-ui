import React, { useState } from "react";
import { crypto } from '@shapeshiftoss/hdwallet-native'
import { Box, Button, CardBody, CardFooter, Collapse, FormControl, FormLabel, Input, Stack, Text, Textarea } from "@chakra-ui/react";

interface FormState {
  email: string;
  password: string;
  encryptedWallet: string;
  mnemonic: string;
}

const { EncryptedWallet } = crypto
const cryptoEngine = new crypto.engines.WebCryptoEngine()

const getEncryptedWallet = () => {
  return new EncryptedWallet(cryptoEngine)
}

const decryptNativeWallet = async (
  email: string,
  password: string,
  encryptedWalletString: string,
): Promise<string | null> => {
  if (!email || !password)
    throw new Error('An email and password are required to decrypt the wallet.')
  if (!encryptedWalletString) throw new Error('An encryptedWallet is required for decryption.')
  try {
    const encryptedWallet = getEncryptedWallet()
    await encryptedWallet.init(email, password, encryptedWalletString)
    return encryptedWallet.decrypt()
  } catch (e) {
    throw new Error('Native wallet decryption failed: ' + e)
  }
}

const SeedForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
    encryptedWallet: "",
    mnemonic: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleTextAreaChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const mnemonic = await decryptNativeWallet(formData.email, formData.password, formData.encryptedWallet)
      setFormData({ ...formData, mnemonic: mnemonic || "" });
    } catch(e) {
      console.error(e)
      setFormData({ ...formData, mnemonic: `failed to decrypt: ${e}`});
    }
  };

  return (
    <Box as='form' onSubmit={handleSubmit}>
      <CardBody px={8} py={8}>
        <Stack spacing={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant='filled'
                size='lg'
              />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant='filled'
                size='lg'
              />
          </FormControl>
          <FormControl>
            <FormLabel>Encrypted Secret Recovery Phrase</FormLabel>
            <Textarea
                name="encryptedWallet"
                value={formData.encryptedWallet}
                onChange={handleTextAreaChange}
                rows={5} // specify number of rows
                cols={30} // specify number of columns
                variant='filled'
                size='lg'
              />
          </FormControl>

            <Button type="submit" colorScheme='blue' size='lg'>Submit</Button>
        </Stack>
      </CardBody>
      <CardFooter bg='background.surface.raised.base' gap={4} flexDir='column' px={8} py={8} borderTopWidth={1} borderColor='border.base'>
        <Collapse in={!!formData.mnemonic}>
          <FormControl>
            <FormLabel>Secret Recovery Phrase</FormLabel>
            <Textarea
              name="mnemonic"
              value={formData.mnemonic}
              disabled={true}
              rows={5} // specify number of rows
              cols={30} // specify number of columns
              variant='filled'
              size='lg'
            />
          </FormControl>
        </Collapse>
        <Text textAlign='center' color='text.subtle' fontSize='sm'>This wallet-decryption tool is provided as is, and all warranties are disclaimed</Text>
      </CardFooter>
    </Box>
  );
};

export default SeedForm;
