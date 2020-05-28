import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {TabsPageModule} from "./tabs/tabs.module";
import {TabsPage} from "./tabs/tabs.page";
import {LoggedInGuard} from 'ngx-auth-firebaseui';

export const routes: Routes = [
  // {
  //   path: "",
  //   //loadChildren: () => import("./tabs/tabs.module").then(module => module.TabsPageModule)
  //   loadChildren: () => import("./pages/start/start.module").then(module => module.StartPageModule)
  // },
  // {
  //   path: "available-stories",
  //   loadChildren: () => import("./pages/available-stories/available-stories.module").then(module => module.AvailableStoriesPageModule)
  // },
  {
    path: "change-user-account-pin",
    loadChildren: () => import("./pages/change-user-account-pin/change-user-account-pin.module").then(module => module.ChangeUserAccountPinPageModule),
    canActivate: [LoggedInGuard]
  },
  {
    path: "create-user-account",
    loadChildren: () => import("./pages/create-user-account/create-user-account.module").then(module => module.CreateUserAccountPageModule)
  },
  {
    path: "create-user-profile",
    canActivate: [LoggedInGuard],
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
    canActivate: [LoggedInGuard],
    loadChildren: () => import("./pages/player/player.module").then(module => module.PlayerPageModule)
  },
  //{path: "player:storieId", loadChildren: './pages/player/player.module'},
  {
    path: "select-user-profile",
    canActivate: [LoggedInGuard],
    loadChildren: () => import("./pages/select-user-profile/select-user-profile.module").then(module => module.SelectUserProfilePageModule)
  },
  // {
  //   path: "settings",
  //   loadChildren: () => import("./pages/settings/settings.module").then(module => module.SettingsPageModule)
  // },
  {
    path: "",
    loadChildren: () => import("./pages/start/start.module").then(module => module.StartPageModule),
    // loadChildren: './pages/start/start.module#StartPageModule',
  },
  // {
  //   path: "story-menu",
  //   loadChildren: () => import("./pages/story-menu/story-menu.module").then(module => module.StoryMenuPageModule)
  // },
  {
    path: "tabs",
    canActivate: [LoggedInGuard],
    loadChildren: () => import("./tabs/tabs.module").then(module => module.TabsPageModule)
  },
  {
    path: "user-account",
    canActivate: [LoggedInGuard],
    loadChildren: () => import("./pages/user-account/user-account.module").then(module => module.UserAccountPageModule)
  },
  {
    path: "story-details",
    canActivate: [LoggedInGuard],
    loadChildren: () => import("./pages/story-details/story-details.module").then(module => module.StoryDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
