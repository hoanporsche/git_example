import React from 'react';
import { MODEL_ROUTING } from '../share/constant/routing.constant';
import OrderList from './model/order/OrderList';
import CategoryList from './model/category/CategoryList';
import * as Guard from '../auth/guard';
import NotFound from '../error/NotFound';

const managementRoutes = [
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CATEGORY,
    exact: true,
    canActive: Guard.adminGuard(),
    main: () => <CategoryList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT,
    exact: true,
    canActive: Guard.storeGuard(),
    main: () => <OrderList />,
  },
  {
    path: '',
    exact: true,
    canActive: Guard.authGuard(),
    main: () => <NotFound />,
  }
]

export default managementRoutes;