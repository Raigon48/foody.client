import type { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

export const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className='border-sla'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold tracking-tight'>
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex'>
        {restaurant.cuisines.map((cuisine, index) => {
          return (
            <span className='flex'>
              <span>{cuisine}</span>
              {index < restaurant.cuisines.length - 1 && <Dot />}
            </span>
          );
        })}
      </CardContent>
    </Card>
  );
};
