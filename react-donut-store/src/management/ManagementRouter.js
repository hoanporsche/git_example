import React from 'react';
import { MODEL_ROUTING, ROUTING_URL } from '../share/constant/routing.constant';
import MaterialDailyReport from './page/material-daily-report/MaterialDailyReport';
import Timekeeping from './page/timekeeping/Timekeeping';
import Config from './page/config/Config';
import OrderList from './page/order/OrderList';
import * as Guard from '../auth/guard';
import NotFound from '../error/NotFound';

const managementRoutes = [
  {
    path: MODEL_ROUTING.MANAGEMENT,
    exact: true,
    canActive: Guard.storeGuard(),
    main: () => <OrderList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.MATERIAL_DAILY_REPORT,
    exact: true,
    canActive: Guard.storeGuard(),
    main: () => <MaterialDailyReport />,
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
    path: '',
    exact: true,
    canActive: Guard.authGuard(),
    main: () => <NotFound />,
  }
]

export default managementRoutes;