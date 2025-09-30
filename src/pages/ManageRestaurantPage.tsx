import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/apis/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isPending}
    />
  );
};
