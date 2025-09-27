import { useUpdateMyUser } from "@/apis/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

export const UserProfilePage = () => {
  const { updateUser, isPending } = useUpdateMyUser();
  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isPending}
    />
  );
};
