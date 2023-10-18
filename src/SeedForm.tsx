import React, { useState } from "react";
import { crypto } from '@shapeshiftoss/hdwallet-native'

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
      setFormData({ ...formData, mnemonic: `failed to decrypt. email, password, and/or encrypted wallet are incorrect.`});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tr>
          <td align="right">Email:</td>
          <td align="left">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td align="right">Password:</td>
          <td align="left">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </td>
        </tr>
        <tr>
          <td align="right">Encrypted Wallet:</td>
          <td align="left">
            <textarea
              name="encryptedWallet"
              value={formData.encryptedWallet}
              onChange={handleTextAreaChange}
              rows={5} // specify number of rows
              cols={30} // specify number of columns
            />
          </td>
        </tr>
        <tr>
          <td align="right">Mnemonic:</td>
          <td align="left">
          <textarea
            name="mnemonic"
            value={formData.mnemonic}
            disabled={true}
            rows={5} // specify number of rows
            cols={30} // specify number of columns
          />
          </td>
        </tr>
        <tr>
          <td/>
          <td align="right"><button type="submit">Submit</button></td>
        </tr>
        
      </table>
    </form>
  );
};

export default SeedForm;
