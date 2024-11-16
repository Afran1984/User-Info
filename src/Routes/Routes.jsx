import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Dashbord from "../Components/Dashbord/Dashbord";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashbord",
    element: <Dashbord />
  }
]);
