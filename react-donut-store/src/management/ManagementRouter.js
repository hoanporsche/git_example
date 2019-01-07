import React from 'react';
import { MODEL_ROUTING, ROUTING_URL } from '../share/constant/routing.constant';
import Report from './page/report/Report';
import Timekeeping from './page/timekeeping/Timekeeping';
import Config from './page/config/Config';
import OrderList from './page/order/OrderList';
import UserProfile from './page/user-profile/UserProfile';
import * as Guard from '../auth/guard';
import NotFound from '../error/NotFound';

const managementRoutes = [
  {
    path: MODEL_ROUTING.MANAGEMENT,
    exact: true,
    canActive: Guard.storeGuard(),
    main: ({ location, history }) => <OrderList location={location} history={history} />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.REPORT,
    exact: false,
    canActive: Guard.storeGuard(),
    main: () => <Report />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.TIMEKEEPING,
    exact: true,
    canActive: Guard.staffGuard(),
    main: () => <Timekeeping />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + ROUTING_URL.CONFIG,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <Config />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + ROUTING_URL.USER_PROFILE,
    exact: true,
    canActive: Guard.staffGuard(),
    main: () => <UserProfile />,
  },
  {
    path: '',
    exact: true,
    canActive: Guard.authGuard(),
    main: () => <NotFound />,
  }
]

export default managementRoutes;