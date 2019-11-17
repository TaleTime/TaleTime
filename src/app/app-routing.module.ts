import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {TabsPageModule} from "./tabs/tabs.module";
const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./tabs/tabs.module").then(module => module.TabsPageModule)
    //loadChildren: () => import("./pages/start/start.module").then(module => module.StartPageModule)
  },
  // {
  //   path: "available-stories",
  //   loadChildren: () => import("./pages/available-stories/available-stories.module").then(module => module.AvailableStoriesPageModule)
  // },
  {
    path: "change-user-account-pin",
    loadChildren: () => import("./pages/change-user-account-pin/change-user-account-pin.module").then(module => module.ChangeUserAccountPinPageModule)
  },
  {
    path: "create-user-account",
    loadChildren: () => import("./pages/create-user-account/create-user-account.module").then(module => module.CreateUserAccountPageModule)
  },
  {
    path: "create-user-profile",
    loadChildren: () => import("./pages/create-user-profile/create-user-profile.module").then(module => module.CreateUserProfilePageModule)
  },
  {
    path: "credits",
    loadChildren: () => import("./pages/credits/credits.module").then(module => module.CreditsPageModule)
  },
  {
    path: "info",
    loadChildren: () => import("./pages/info/info.module").then(module => module.InfoPageModule)
  },
  {
    path: "legal-information",
    loadChildren: () => import("./pages/legal-information/legal-information.module").then(module => module.LegalInformationPageModule)
  },
  {
    path: "player",
    loadChildren: () => import("./pages/player/player.module").then(module => module.PlayerPageModule)
  },
  //{path: "player:storieId", loadChildren: './pages/player/player.module'},
  {
    path: "select-user-profile",
    loadChildren: () => import("./pages/select-user-profile/select-user-profile.module").then(module => module.SelectUserProfilePageModule)
  },
  // {
  //   path: "settings",
  //   loadChildren: () => import("./pages/settings/settings.module").then(module => module.SettingsPageModule)
  // },
  {
    path: "start",
    loadChildren: () => import("./pages/start/start.module").then(module => module.StartPageModule)
  },
  {
    path: "story-details",
    loadChildren: () => import("./pages/story-details/story-details.module").then(module => module.StoryDetailsPageModule)
  },
  // {
  //   path: "story-menu",
  //   loadChildren: () => import("./pages/story-menu/story-menu.module").then(module => module.StoryMenuPageModule)
  // },
  {
    path: "tabs",
    component: TabsPageModule
  },
  {
    path: "user-account",
    loadChildren: () => import("./pages/user-account/user-account.module").then(module => module.UserAccountPageModule)
  },
  {
    path: "**",
    redirectTo: "tabs",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
