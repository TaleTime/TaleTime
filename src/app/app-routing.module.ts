import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {path: "available-stories", loadChildren: "./pages/available-stories/available-stories.module#AvailableStoriesPageModule"},
  {
    path: "change-user-account-pin",
    loadChildren: "./pages/change-user-account-pin/change-user-account-pin.module#ChangeUserAccountPinPageModule"
  },
  {path: "create-user-account", loadChildren: "./pages/create-user-account/create-user-account.module#CreateUserAccountPageModule"},
  {path: "create-user-profile", loadChildren: "./pages/create-user-profile/create-user-profile.module#CreateUserProfilePageModule"},
  {path: "credits", loadChildren: "./pages/credits/credits.module#CreditsPageModule"},
  {path: "info", loadChildren: "./pages/info/info.module#InfoPageModule"},
  {path: "legal-information", loadChildren: "./pages/legal-information/legal-information.module#LegalInformationPageModule"},
  {path: "player", loadChildren: "./pages/player/player.module#PlayerPageModule"},
  {path: "select-user-profile", loadChildren: "./pages/select-user-profile/select-user-profile.module#SelectUserProfilePageModule"},
  {path: "settings", loadChildren: "./pages/settings/settings.module#SettingsPageModule"},
  {path: "start", loadChildren: "./pages/start/start.module#StartPageModule"},
  {path: "story-details", loadChildren: "./pages/story-details/story-details.module#StoryDetailsPageModule"},
  {path: "story-menu", loadChildren: "./pages/story-menu/story-menu.module#StoryMenuPageModule"},
  {path: "tabs", loadChildren: "./pages/tabs/tabs.module#TabsPageModule"},
  {path: "user-account", loadChildren: "./pages/user-account/user-account.module#UserAccountPageModule"},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
