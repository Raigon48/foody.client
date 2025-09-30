import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DetailSection } from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import { CuisinesSection } from "./CuisinesSection";
import { MenuSection } from "./MenuSection";
import { ImageSection } from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string("restaurant name is required"),
    city: z.string("city is required"),
    country: z.string("country is required"),
    deliveryPrice: z.coerce.number<number>({
      error: "deliveryPrice is required",
    }),
    estimatedDeliveryTime: z.coerce.number<number>({
      error: "estimatedDeliveryTime is required",
    }),
    cuisines: z.array(z.string()).nonempty("Please select atleast one item"),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce
          .number<number>({
            error: "price is required",
          })
          .gt(0, "price should be greater than 0"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { error: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    error: "Either image url or image file must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormdata: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [
        {
          name: "",
          price: 0,
        },
      ],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurant.menuItems.map((item) => {
      return { ...item, price: parseInt((item.price / 100).toFixed(2)) };
    });

    const formattedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(formattedRestaurant);
  }, [restaurant, form]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    // convert formDataJson to new FormData object
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-gray-50 p-10 rounded-lg'
      >
        <DetailSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
