import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  Box,
  Button,
  Grid,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  chakra,
} from "@chakra-ui/react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useState } from "react";
const providers = [
  {
    name: "github",
    Icon: BsGithub,
  },

  {
    name: "google",
    Icon: BsGoogle,
  },
];

export default function Signin() {
  const [email, setEmail] = useState("");
  const { data: session, status } = useSession();
  const { push, asPath } = useRouter();

  const handleOAuthSignIn = (provider) => {
    signIn(provider);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return false;

    signIn("email", { email, redirect: false });
  };

  if (status === "loading")
    return <Heading>Checking Authentication ...</Heading>;

  if (session) {
    setTimeout(() => {
      push("/");
    }, 5000);
    return <Heading>You are already signed in</Heading>;
  }

  return (
    <Box>
      <chakra.form onSubmit={handleSubmit}>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type='submit' w='100%' my={5}>
          Login
        </Button>
      </chakra.form>

      <VStack>
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            leftIcon={<Icon />}
            onClick={() => handleOAuthSignIn(name)}
            textTransform='uppercase'
            w='100%'
          >
            Sign in with {name}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}
