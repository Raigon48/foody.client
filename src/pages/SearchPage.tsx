import { useParams } from "react-router-dom";

export const SearchPage = () => {
  const { city } = useParams();
  return <div>SearchPage {city}</div>;
};
