import React from 'react';
import HomeComponent from './page/home/home.component';
import OrderComponent from './page/order/order.component';
import AboutComponent from './page/about/about.component';
import ContactComponent from './page/contact/contact.component';
// import { ROUTING_URL } from '../share/constant/routing.constant';

const mainRoutes = [
  {
    path : '/',
    exact : true,
    main : () => <HomeComponent />,
  },
  {
    path : "/order",
    exact : false,
    main : () => <OrderComponent />,
  },
  {
    path : "/about",
    exact : false,
    main : () => <AboutComponent />,
  },
  {
    path : "/contact",
    exact : false,
    main : () => <ContactComponent />,
  },
]

export default mainRoutes;