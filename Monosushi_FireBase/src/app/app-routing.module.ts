import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth/auth.guard';
import { AdminGuard } from './shared/guards/admin/admin.guard';

import { OrderProductComponent } from './pages/order-product/order-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'adminAuth',
    loadChildren: () =>
      import('./components/admin-auth-dialog/admin-auth-dialog.module').then(
        (m) => m.AdminAuthDialogModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'cabinet',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/cabinet/cabinet.module').then((m) => m.CabinetModule),
  },
  {
    path: 'delivery',
    loadChildren: () =>
      import('./pages/delivery/delivery.module').then((m) => m.DeliveryModule),
  },
  {
    path: 'offerta',
    loadChildren: () =>
      import('./pages/offerta/offerta.module').then((m) => m.OffertaModule),
  },
  {
    path: 'action',
    loadChildren: () =>
      import('./pages/discount/discount.module').then((m) => m.DiscountModule),
  },
  {
    path: 'product/:category',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductModule),
  },
  { path: 'ordersProduct', component: OrderProductComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
