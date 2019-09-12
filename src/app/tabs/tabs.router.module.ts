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
              import("../pages/story-menu/story-menu.module").then(m => m.StoryMenuPageModule)
          }
        ]
      },
      {
        path: "available-stories",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/available-stories/available-stories.module").then(m => m.AvailableStoriesPageModule)
          }
        ]
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/settings/settings.module").then(m => m.SettingsPageModule)
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
