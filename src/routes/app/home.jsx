import { useAuth } from "@/components/auth-provider";

const Room = () => {
  const { auth } = useAuth();

  console.log(auth);

  return (
    <>
    </>
  )
};

export default Room;