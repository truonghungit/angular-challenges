import { Route } from '@angular/router';

const adminFeatureRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'create-user',
    loadComponent: () => import('./create-user/create-user.component'),
  },
];

export default adminFeatureRoutes;
