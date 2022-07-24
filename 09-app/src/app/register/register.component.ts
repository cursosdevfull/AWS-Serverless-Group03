import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  group: FormGroup;

  constructor(private router: Router) {
    this.group = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  register() {
    const { email, password } = this.group.value;
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
    })
      .then((response) => {
        this.router.navigate(['/confirm']);
      })
      .catch(console.log);
  }
}
