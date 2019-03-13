import React from 'react';
import Home from './page/home/Home';
import Order from './page/order/Order';
import Contact from './page/contact/Contact';
import Detail from './page/detail/Detail';
import DetailOrder from './page/detail-order/DetailOrder';
import { ROUTING_URL } from '../share/constant/routing.constant';
import NotFound from '../error/NotFound';

const mainRoutes = [
  {
    path : ROUTING_URL.HOME,
    exact : true,
    main : ({location}) => <Home location={location}/>,
  },
  {
    path : ROUTING_URL.CONTACT,
    exact : false,
    main : () => <Contact />,
  },
  {
    path : ROUTING_URL.ORDER,
    exact : false,
    main : () => <Order />,
  },
  {
    path : ROUTING_URL.DETAIL_ORDER,
    exact : true,
    main : ({location, history}) => <DetailOrder history={history} location={location}/>,
  },
  {
    path : ROUTING_URL.DETAIL,
    exact : true,
    main : () => <Detail />
  },
  {
    path : ROUTING_URL.DETAIL + '/:url',
    exact : false,
    main : ({location, match}) => <Detail location={location} match={match}/>
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />
  }
]

export default mainRoutes;