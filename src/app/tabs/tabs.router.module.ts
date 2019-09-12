import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TabsPage} from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "story-menu",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab1/tab1.module").then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: "available-stories",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../tab2/tab2.module").then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../settings/settings.module").then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/story-menu",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/story-menu",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
