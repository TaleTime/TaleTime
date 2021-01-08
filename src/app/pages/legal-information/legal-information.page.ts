  import {Component, OnInit} from "@angular/core";
	import {NavController} from "@ionic/angular";
	import {Router} from "@angular/router";
	import {AuthService} from "../../services/auth/auth.service";

	@Component({
	  selector: "app-legal-information",
	  templateUrl: "./legal-information.page.html",
	  styleUrls: ["./legal-information.page.scss"],
	})
	export class LegalInformationPage {

	  constructor(
		private navCtrl: NavController,
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
