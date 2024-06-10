
import { fetchUserTokensById } from '@/utlis/actions';
import { UserProfile } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  const authHeaders = headers(); // Get the headers from next/headers
  const { userId } = getAuth(authHeaders); // Pass the headers to getAuth
  const currentTokens = await fetchUserTokensById(userId);

  return (
    <div>
      <h2 className='mb-8 ml-8 text-xl font-extrabold'>
        Token Amount: {currentTokens}
      </h2>
      <UserProfile routing="path" path="/profile" />
    </div>
  );
};

export default ProfilePage;

