import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myform: FormGroup;
  constructor(private fb: FormBuilder, private firestore: AuthService) { this.firestore.Auth(); }

  ngOnInit() {
    this.myform = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  signIn() {
    const email = this.myform.get('email').value;
    const password = this.myform.get('password').value;
    this.firestore.OnRegister(email, password);
  }

}
