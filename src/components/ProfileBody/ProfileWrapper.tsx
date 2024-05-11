"use client";

import PageNavigations from "@/components/PageNavigations/PageNavigations";
import ProfileBody from "@/components/ProfileBody/ProfileBody";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";

const navigation_data = [
  {
    id: "p1",
    title: "Home",
    pathname: "/",
  },
  {
    id: "p2",
    title: "Profile",
    pathname: "/profile",
  },
];

const ProfileWrapper = () => {
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
  )
}

export default ProfileWrapper