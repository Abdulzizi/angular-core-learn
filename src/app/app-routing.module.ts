import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { PageNotFoundComponent } from './shared/page-error/404/page-not-found.component';

const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule) },
    { path: '', component: LayoutComponent, loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule) },
    { path: 'error/404', component: PageNotFoundComponent},
    { path: '**', redirectTo: 'error/404'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
