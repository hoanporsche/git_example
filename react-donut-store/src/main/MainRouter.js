import React from 'react';
import Home from './page/home/Home';
import Order from './page/order/Order';
import Contact from './page/contact/Contact';
import Detail from './page/detail/Detail';
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
  {
    path : ROUTING_URL.DETAIL + '/:id',
    exact : true,
    main : ({location}) => <Detail location={location}/>
  }
]

export default mainRoutes;