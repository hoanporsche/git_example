import React from 'react';
import Home from './page/home/Home';
import Order from './page/order/Order';
import Contact from './page/contact/Contact';
import { ROUTING_URL } from '../share/constant/routing.constant';

const mainRoutes = [
  {
    path : ROUTING_URL.HOME,
    exact : true,
    main : () => <Home />,
  },
  {
    path : ROUTING_URL.ORDER,
    exact : false,
    main : () => <Order />,
  },
  {
    path : ROUTING_URL.CONTACT,
    exact : false,
    main : () => <Contact />,
  },
]

export default mainRoutes;