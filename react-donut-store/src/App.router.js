import { ROUTING_URL } from './share/constant/routing.constant';

import React from 'react';
import Home from './main/page/home/Home';
import Order from './main/page/order/Order';
import Contact from './main/page/contact/Contact';

const appRoutes = [
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

export default appRoutes;