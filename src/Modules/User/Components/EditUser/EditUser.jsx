import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  Drawer,
  Button,
  Container,
  Typography,
  Alert,
  Box,
  Link,
  TextField,
  CssBaseline,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserThunk, getAllUserThunk } from "../../slice/userSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function EditUser(userInfo) {
  const { dataFromParent } = userInfo;

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {},
    mode: "onTouched",
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    // passWord: "",
    userId: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((current) => {
      return {
        ...current,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (dataFromParent) {
      setUser(dataFromParent);
    }
  }, [dataFromParent]);

  const onSubmit = async () => {
    let userInfo = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      id: user.userId,
    };
    try {
      dispatch(updateUserThunk(userInfo))
        .unwrap()
        .then(() => dispatch(getAllUserThunk()))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const list = () => (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <img
              width={"100%"}
              src="/logo-removebg-preview.png"
              alt="/logo-removebg-preview.png"
            />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit user
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                // required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={user?.name}
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={user?.email}
                onChange={handleChange}
              />
              {error ? <Alert severity="error">{error}</Alert> : ""}
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="Phone number"
                type="phoneNumber"
                id="phoneNumber"
                autoComplete="current-password"
                value={user?.phoneNumber}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                UPDATE
              </Button>
            </form>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button color="success" onClick={toggleDrawer("right", true)}>
          <FontAwesomeIcon
            icon={faPen}
            // onClick={() => {
            //   dispatch(getProjectDetailThunk(dataFromParent));
            // }}
          />
        </Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
