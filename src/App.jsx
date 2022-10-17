import { Box } from "@mui/system";
import React, { Suspense, useEffect } from "react";
import { Route, Routes  } from "react-router-dom";
import "./App.css";




const Loader = React.lazy(() => import("./UI/Display/Loader/Loader"));
const Login = React.lazy(() => import("./Modules/Auth/Components/Login"));
const Register = React.lazy(() => import("./Modules/Auth/Components/Register"));
const CheckoutRoute = React.lazy(() => import("./Routes/CheckoutRoute"));
const MainLayout = React.lazy(() => import("./UI/Layout/MainLayout/Pages"));
const User = React.lazy(() => import("./Modules/User/Pages/User"));


function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <>
            <Box height={160} />
            <Loader />
          </>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <CheckoutRoute>
                <MainLayout />
              </CheckoutRoute>
            }
          ></Route>

          <Route path="/" element={<MainLayout />}>
            <Route path="/user" element={<User />} />

          </Route>
          <Route path="/">
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;




