import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Home from "../pages/home/Home";
import AllEvent from "../pages/event/all-event/AllEvent";
import SideBar from "../components/side-bar/SideBar";
import AllRoom from "../pages/room/all-room/AllRoom";
import CreateEvent from "../pages/event/create-event/CreateEvent";
import CreateRoom from "../pages/room/create-room/CreateRoom";
import { HomeLayout } from "../layout/homeLayout/HomeLayout.js";
import TicketIssuance from "../pages/event/ticket-issuance/TicketIssuance.js";
import CheckTicket from "../pages/event/check-ticket/CheckTicket.js";
import SignUp from "../pages/auth/sign-up/SignUp.js";

const router = [
      {
        path: "/login",
        page: Login,
        homeLayout: false,
      },
      {
        path: "/sign-up",
        page: SignUp,
        homeLayout: false,
      },
      {
        path: "/home",
        page: Home,
        homeLayout: true,
      },
      {
        path: "/all-event",
        page: AllEvent,
        homeLayout: true,
      },
      {
        path: "/all-room",
        page: AllRoom,
        homeLayout: true,
      },
      {
        path: "/create-event",
        page: CreateEvent,
        homeLayout: true,
      },
      {
        path: "/create-room",
        page: CreateRoom,
        homeLayout: true,
      },
      {
        path: "/ticket-issuance",
        page: TicketIssuance,
        homeLayout: true,
      },
      {
        path: "/check-ticket",
        page: CheckTicket,
        homeLayout: true,
      },
      // {
      //   path: "/test",
      //   page: HomeLayout,
      // },
  ];
export default router;