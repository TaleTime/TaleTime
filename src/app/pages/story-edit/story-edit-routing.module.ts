import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoryEditPage } from './story-edit.page';

const routes: Routes = [
  {
    path: '',
    component: StoryEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryEditPageRoutingModule {}
