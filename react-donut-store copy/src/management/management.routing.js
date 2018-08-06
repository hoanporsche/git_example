import React from 'react';
// import { MODEL_ROUTING } from '../share/constant/routing.constant';
import CategoryComponent from './model/category/category.component';

const managementRoutes = [
  {
    path : '/management',
    exact : true,
    main : () => <CategoryComponent />,
  },
  // {
  //   path : '',
  //   exact : false,
  //   main : () => <ErrorComponent />
  // }
]

export default managementRoutes;