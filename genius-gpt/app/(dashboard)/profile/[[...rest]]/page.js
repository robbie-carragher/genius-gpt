
import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = () => (
  <div>
    <UserProfile routing="path" path="/profile" />
  </div>
);

export default UserProfilePage;

