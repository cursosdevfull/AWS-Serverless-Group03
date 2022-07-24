import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  group: FormGroup;

  constructor(private router: Router) {
    this.group = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      code: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  confirm() {
    const { email, code } = this.group.value;

    Auth.confirmSignUp(email, code)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(console.log);
  }
}
