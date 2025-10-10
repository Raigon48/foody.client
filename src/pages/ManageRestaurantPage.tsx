import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/apis/MyRestaurantApi";
import { OrderItemCard } from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export const ManageRestaurantPage = () => {
  const { createRestaurant, isPending: isLoadingCreate } =
    useCreateMyRestaurant();
  const { updateRestaurant, isPending: isLoadingUpdate } =
    useUpdateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { orders } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue='orders'>
      <TabsList>
        <TabsTrigger value='orders'>Orders</TabsTrigger>
        <TabsTrigger value='manage-restaurant'>ManageRestaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value='orders'
        className='space-y-5 bg-gray-50 pg-10 rounded-lg'
      >
        <h2 className='text-2xl font-bold'>{orders?.length} Acitve Orders</h2>
        {orders?.map((order) => {
          return <OrderItemCard order={order} />;
        })}
      </TabsContent>
      <TabsContent value='manage-restaurant'>
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isLoadingCreate || isLoadingUpdate}
        />
      </TabsContent>
    </Tabs>
  );
};
