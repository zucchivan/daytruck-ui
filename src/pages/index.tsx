import { type NextPage } from "next";
import Head from "next/head";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from 'next-themes';
import className from 'classnames';

import { api } from "~/utils/api";
import { User } from "@clerk/nextjs/dist/api";
import { Background } from "~/background/Background";
import { Section } from "~/layout/Section";
import { NavbarTwoColumns } from "~/navigation/NavbarTwoColumns";
import { ReactNode, useEffect } from "react";
import Link from "next/link";



export interface LandingLayoutProps {
  children?: React.ReactNode; 
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  return (
    <main className="relative flex flex-col text-blue-900">{children}</main>
  );
};

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? '44' : '32';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    <span className={`text-gray-900 inline-flex items-center ${fontStyle}`}>
      <svg
        className="text-primary-500 stroke-current mr-1"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <rect x="3" y="12" width="6" height="8" rx="1" />
        <rect x="9" y="8" width="6" height="12" rx="1" />
        <rect x="15" y="4" width="6" height="16" rx="1" />
        <path d="M4 20h14" />
      </svg>

      The Language Link
    </span>
  );
};

type ButtonProps = {
  xl?: boolean;
  children: string;
};

const Button = (props: ButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary': true,
  });

  return (
    <div className={btnClass}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block rounded-md text-center;
          }

          .btn-base {
            @apply text-lg font-semibold py-2 px-4;
          }

          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
          }

          .btn-primary {
            @apply text-white bg-primary-500;
          }

          .btn-primary:hover {
            @apply bg-primary-600;
          }
        `}
      </style>
    </div>
  );
};

type HeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
};

const HeroOneButton = (props: HeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="text-5xl text-blue-800 font-bold whitespace-pre-line leading-hero">
      {props.title}
    </h1>
    <div className="text-2xl mt-4 mb-16">{props.description}</div>

    {props.button}
  </header>
);

const Hero = () => {
  const { isSignedIn } = useUser();
  
  return (
    <>
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={<Logo xl />} >
          <li className='text-blue-900'>
            {!isSignedIn &&  <SignInButton mode='modal'> Entrar </SignInButton>}
            {isSignedIn &&  <SignOutButton> Sair </SignOutButton>}
          </li>
        </NavbarTwoColumns>
      </Section>

      <Section yPadding="pt-20 pb-32">
        <HeroOneButton
          title={
            <>
              {'Sua plataforma de ensino baseada em \n'}
              <span className="text-rose-600">conversação</span>
            </>
          }
          description="A forma mais fácil de atingir a fluência"
          button={
            <Link href="https://creativedesignsguru.com/category/nextjs/">
              <Button xl>Entre em contato!</Button>
            </Link>
          }
          />
      </Section>
    </>
  )
};

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <LandingLayout>
      <Head>
        <title>The Language Link</title>
        <meta name="description" content="Your language platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero/>
    </LandingLayout>
  );
};

export default Home;
