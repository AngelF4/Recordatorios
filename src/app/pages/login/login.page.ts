import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  screen: any = 'signin';
  email: string = '';
  password: string = '';
  

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  change(event: any){
    this.screen = event;
  }

  onSubmit() {
    const formData = {
      email: this.email,
      password: this.password
    };


    if(this.screen == "signup")
      this.userService.register(formData)
        .then(response => {
          console.log(response);
          this.router.navigate(['/login']);
          this.screen = 'signin'
        })
        .catch(error => console.log(error));
    else if(this.screen =="signin")
      this.userService.login(formData)
        .then(response => {
          console.log(response);
          this.router.navigate(['/home']);
        })
        .catch(error => console.log(error));  
  }
}
