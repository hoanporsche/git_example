import React from 'react';
import * as Guard from '../../../auth/guard';
import CategoryList from './model/category/CategoryList';
import ConfigGlobal from './model/config-global/ConfigGlobal';
import ItemList from './model/item/ItemList';
import MaterialList from './model/material/MaterialList';
import OrderStatusList from './model/order-status/OrderStatusList';
import RoleList from './model/role/RoleList';
import StaffList from './model/staff/StaffList';
import StoreList from './model/store/StoreList';
import SupplyList from './model/supply/SupplyList';
import TimekeepingStatusList from './model/timekeeping-status/TimekeepingStatusList';
import UserList from './model/user/UserList';
import WorkingCalenderList from './model/working-calender/WorkingCalenderList';
import NotFound from '../../../error/NotFound';
import { MODEL_ROUTING } from '../../../share/constant/routing.constant';

const configRoutes = [
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG,
    exact: true,
    canActive: Guard.adminGuard(),
    main: () => <CategoryList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.CONFIG_GLOBAL,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <ConfigGlobal />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.ITEM,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <ItemList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.MATERIAL,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <MaterialList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.ORDER_STATUS,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <OrderStatusList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.ROLE,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <RoleList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.STAFF,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <StaffList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.STORE,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <StoreList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.SUPPLY,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <SupplyList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.TIMEKEEPING_STATUS,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <TimekeepingStatusList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.USER,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <UserList />,
  },
  {
    path: MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CONFIG + MODEL_ROUTING.WORKING_CALENDER,
    exact: false,
    canActive: Guard.adminGuard(),
    main: () => <WorkingCalenderList />,
  },
  {
    path: '',
    exact: true,
    canActive: Guard.adminGuard(),
    main: () => <NotFound />,
  }
]

export default configRoutes;