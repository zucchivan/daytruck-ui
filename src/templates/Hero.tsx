import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { Background } from '~/background/Background';

import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';

const Hero = () => {
  const user = useUser();
  
  return (
    <Background color='' >
      <Section yPadding="py-6">
        <NavbarTwoColumns logo={undefined} >
          <li className='text-blue-900'>
            {!user.isSignedIn &&  <SignInButton mode='modal' />}
            {!!user.isSignedIn &&  <SignOutButton />}
          </li>
        </NavbarTwoColumns>
      </Section>

      <Section yPadding="pt-20 pb-32">

      </Section>
    </Background>
  )
};

export { Hero };
