import PageNavigations from "@/components/PageNavigations/PageNavigations";
import ProfileBody from "@/components/ProfileBody/ProfileBody";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { navigation_data } from "@/dummy_data/data";

const ProfilePage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <Container
      component="div"
      maxWidth={false}
      sx={{ mt: 8, width: "100%" }}
    >
      <CssBaseline />
      <PageNavigations arr={navigation_data} />
      <ProfileBody />
    </Container>
  );
};

export default ProfilePage;
