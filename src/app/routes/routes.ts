import { LayoutComponent } from '../layout/layout.component';
import { Error404Component } from './pages/error404/error404.component';
import { AuthGuard } from '../shared/guards/auth.guard';



export const routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' },

    {path: '404', component: Error404Component},

    {
        path: 'app',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' , canActivate: [AuthGuard] }
        ]
    },

    {path: 'pages', loadChildren: './pages/pages.module#PagesModule' },


    // Not found
    { path: '**', redirectTo: '404' },


];
