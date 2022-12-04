import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Grid, Heading } from "@chakra-ui/react";

export default function Home() {
  const { data: session } = useSession();
  const { push } = useRouter();

  //? redirect: true  --> reload on redirect

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    console.log(data);

    push(data.url);
  };

  const handleSignIn = () => push(`/auth/signin`);

  return (
    <Grid placeItems='center' gridRowGap='1rem'>
      {session ? (
        <>
          <Heading>Signed In As {session.user.email}</Heading>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </>
      ) : (
        <>
          <Heading>You Are Not Signed In</Heading>
          <Button onClick={handleSignIn}>Sign In</Button>
        </>
      )}
    </Grid>
  );
}
