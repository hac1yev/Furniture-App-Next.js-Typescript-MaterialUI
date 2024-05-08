import ProfileWrapper from "@/components/ProfileBody/ProfileWrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <ProfileWrapper />
  );
};

export default ProfilePage;
