import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TabsPage} from "./tabs.page";
import {StoryMenuPage} from "../pages/story-menu/story-menu.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "",
        redirectTo: "story-menu",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/story-menu/story-menu.module").then(m => m.StoryMenuPageModule)
          }
        ],
      },
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
        path: "available-stories",
        loadChildren: () =>
          import("../pages/available-stories/available-stories.module").then(m => m.AvailableStoriesPageModule),
        pathMatch: "full"
      },
    ]
  }
];

// const routes: Routes = [
//   {
//     path: "tabs",
//     component: TabsPage,
//     children: [
//       // {
//       //   path: "story-menu",
//       //   children: [
//       //     {
//       //       path: "",
//       //       loadChildren: () =>
//       //         import("../pages/story-menu/story-menu.module").then(m => m.StoryMenuPageModule)
//       //     }
//       //   ]
//       // },
//       // {
//       //   path: "available-stories",
//       //   children: [
//       //     {
//       //       path: "",
//       //       loadChildren: () =>
//       //         import("../pages/available-stories/available-stories.module").then(m => m.AvailableStoriesPageModule)
//       //     }
//       //   ]
//       // },
//       // {
//       //   path: "settings",
//       //   children: [
//       //     {
//       //       path: "",
//       //       loadChildren: () =>
//       //         import("../pages/settings/settings.module").then(m => m.SettingsPageModule)
//       //     }
//       //   ]
//       // },
//       // {
//       //   path: "",
//       //   // redirectTo: "/tabs/story-menu",
//       //   // redirectTo: "/tabs",
//       //   loadChildren: () =>
//       //     import("../pages/story-menu/story-menu.module").then(m => m.StoryMenuPageModule),
//       //   pathMatch: "full"
//       // }
//     ]
//   },
//   {
//     path: "",
//     // redirectTo: "/tabs/story-menu",
//     loadChildren: () =>
//       import("../pages/story-menu/story-menu.module").then(m => m.StoryMenuPageModule),
//     // redirectTo: "/tabs",
//     pathMatch: "full"
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
