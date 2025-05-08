import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabItemPage } from './tab-item.page';

const routes: Routes = [
  {
    path: '',
    component: TabItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabItemPageRoutingModule {}
