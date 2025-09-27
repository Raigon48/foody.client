import { useGetMyUser, useUpdateMyUser } from "@/apis/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

export const UserProfilePage = () => {
  const { currentUser, isLoading } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isPending}
    />
  );
};
