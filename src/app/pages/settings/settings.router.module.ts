import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SettingsPage} from "./settings.page";

const routes: Routes = [
  {
    path: "settings",
    component: SettingsPage,
  },
  {
    path: "",
    redirectTo: "/settings",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
