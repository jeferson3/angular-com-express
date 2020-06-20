import { Component } from '@angular/core';
import { JwtApiService } from 'src/services/jwt-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  BtnLoginState = false;
  AlertLoginState = {
    state: false,
    success: false
  }
  token: string;
  users: any;
  form = {
    email: '',
    password: ''
  }

  constructor(private apiService: JwtApiService) {
    try {
      let token = localStorage.getItem('token');
      if (token) {
        this.getUsers(localStorage.getItem('token'));
        this.BtnLoginState = true
      }
      else {
        this.BtnLoginState = false
      }

    } catch (error) {
      console.warn(error);

    }

  }

  async login(user) {

    await this.apiService.login(user).subscribe(data => {
      if (data.token) {

        this.AlertLoginState.state = true;
        this.AlertLoginState.success = true;

        this.token = data.token;
        this.form.email = ''
        this.form.password = ''



        this.getUsers(this.token)
        localStorage.setItem('token', this.token)
        this.BtnLoginState = true

      }
      else {
        this.form.email = ''
        this.form.password = ''
        this.AlertLoginState.state = true;
        this.AlertLoginState.success = false;
      }

    }, error => {
      console.log(error);
      
      this.form.password = ''
      this.AlertLoginState.state = true;
      this.AlertLoginState.success = false;

    })
    setTimeout(() => {
      this.AlertLoginState.state = false
    }, 1000)
  }

  async logout() {
    await localStorage.removeItem('token');
    this.BtnLoginState = false
    this.AlertLoginState.state = false;
    this.AlertLoginState.success = false;
    this.users = [];

  }
  async getUsers(token) {
    await this.apiService.getUsers(token).subscribe(data => {
      this.users = data;

    }, error => {
      console.error({ "Error ": error.name });

    })
  }

}
