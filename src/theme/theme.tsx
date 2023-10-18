import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { semanticTokens } from "./semanticTokens";
import { ButtonStyle as Button } from "./components/Button";
import { InputStyle as Input } from "./components/Input";
import { TextareaStyle as Textarea } from "./components/Textarea";
import { CardStyle as Card } from "./components/Card";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

export const theme = extendTheme({
  config,
  colors,
  semanticTokens,
  components: {
    Button,
    Input,
    Textarea,
    Card
  }
})