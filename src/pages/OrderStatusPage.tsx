import { useGetMyOrders } from "@/apis/OrderApi";
import { OrderHeaderStatus } from "@/components/OrderHeaderStatus";
import { OrderStatusDetail } from "@/components/OrderStatusDetail";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return "Loading...";
  }

  if (!orders || orders.length === 0) {
    return "No orders found";
  }

  return (
    <div className='space-y-10'>
      {orders.map((order) => (
        <div className='space-y-10 bg-gray-50 p-10 rounded-lg'>
          <OrderHeaderStatus order={order} />
          <div className='grid gap-10 md:grid-cols-2'>
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className='object-cover rounded-md w-full h-full'
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};
