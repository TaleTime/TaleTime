import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email;

  constructor(private storage: Storage,
              private authService: AuthService
              ) { }

  ngOnInit() {
  }

  public login(){
    console.log('TEST', this.email);
  }

}
