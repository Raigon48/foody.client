import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";

export default function MobileNavLinks() {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to='/user-profile'
        className='flex bg-white items-center font-bold hover:text-organge-500'
      >
        User Profile
      </Link>

      <Button
        onClick={() => logout()}
        className='flex items-center px-3 font-bold hover:bg-gray-500'
      >
        Log Out
      </Button>
    </>
  );
}
