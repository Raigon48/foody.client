import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/apis/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export const ManageRestaurantPage = () => {
  const { createRestaurant, isPending: isLoadingCreate } =
    useCreateMyRestaurant();
  const { updateRestaurant, isPending: isLoadingUpdate } =
    useUpdateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isLoadingCreate || isLoadingUpdate}
    />
  );
};
