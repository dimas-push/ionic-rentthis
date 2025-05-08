import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'tab-item',
    loadChildren: () => import('./tab-item/tab-item.module').then( m => m.TabItemPageModule)
  },
  {
    path: 'tab-register',
    loadChildren: () => import('./tab-register/tab-register.module').then( m => m.TabRegisterPageModule)
  },
  {
    path: 'tab-login',
    loadChildren: () => import('./tab-login/tab-login.module').then( m => m.TabLoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
