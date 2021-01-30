  import {Component, OnInit} from "@angular/core";
	import {NavController, NavParams} from "@ionic/angular";
	import {Router} from "@angular/router";
	import {AuthService} from "../../services/auth/auth.service";

	@Component({
	  selector: "app-credits",
	  templateUrl: "./credits.page.html",
	  styleUrls: ["./credits.page.scss"],
	})
	export class CreditsPage {

	  constructor(
		public navCtrl: NavController,
		private router: Router,
		private authService: AuthService
		) {
		  if(this.authService.currentUserAccount == null){
			this.router.navigate(["/start"]);
		  }
	  }
	  public close() {
		this.router.navigate(["tabs/settings"]);
	  }
	  
	}
