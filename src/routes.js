import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import AvailablePools from "views/admin/AvailablePools";
import PoolAnalytics from "views/admin/PoolAnalytics";
import Rewards from "views/admin/Rewards";
import MyStrategies from "views/admin/MyStrategies";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "My Strategies",
    layout: "/admin",
    path: "/MyStrategies",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: MyStrategies,
    secondary: true,
  },
  {
    name: "Rewards",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/Rewards",
    component: Rewards,
  },
  {
    name: "Available Pools",
    layout: "/admin",
    path: "/AvailablePools",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: AvailablePools,
  },
  {
    name: "Pool Analytics",
    layout: "/admin",
    path: "/PoolAnalytics",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: PoolAnalytics,
  },
];

export default routes;
