import React from 'react';
import CategoryListComponent from './page/category-list/category-list.component';

const routes = [
  {
    path : '/',
    exact : true,
    main : () => <CategoryListComponent />
  },
]

export default routes;