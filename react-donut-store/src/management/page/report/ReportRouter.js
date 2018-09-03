import React from 'react';
import * as Guard from '../../../auth/guard';
import MaterialDailyReport from './component/material-daily-report/MaterialDailyReport';
import OrderReport from './component/order-report/OrderReport';
import NotFound from '../../../error/NotFound';
import { MODEL_ROUTING } from '../../../share/constant/routing.constant';

const configRoutes = [
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.REPORT,
    exact: true,
    canActive: Guard.storeGuard(),
    main: () => <MaterialDailyReport />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.REPORT + MODEL_ROUTING.ORDER_REPORT,
    exact: true,
    canActive: Guard.adminGuard(),
    main: () => <OrderReport />,
  },
  {
    path: '',
    exact: true,
    canActive: Guard.storeGuard(),
    main: () => <NotFound />,
  }
]

export default configRoutes;