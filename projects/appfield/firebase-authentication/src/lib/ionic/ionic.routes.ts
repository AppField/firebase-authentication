import { Routes } from '@angular/router';
import { AuthRoutes } from '../enums';

// Use old lazy loading syntax due to:
// https://github.com/ng-packagr/ng-packagr/issues/1285
const routes: Routes = [
    {
        path: AuthRoutes.LOGIN,
        // loadChildren: () => import('./ionic-login.module').then(m => m.IonicLoginModule)
        loadChildren: './ionic-login.module#IonicLoginModule'
    },
    {
        path: AuthRoutes.REGISTER,
        // loadChildren: () => import('./ionic-register.module').then(m => m.IonicRegisterModule)
        loadChildren: './ionic-register.module#IonicRegisterModule'
    }
];
export { routes };
