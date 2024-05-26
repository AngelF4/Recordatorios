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
  name: string = ''; // Añadir campo name
  user_image: string = ''; // Añadir campo user_image

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  change(event: any) {
    this.screen = event;
  }

  onSubmit() {
    const formData = {
      name: this.name, // Añadir name
      email: this.email,
      password: this.password,
      user_image: this.user_image // Añadir user_image
    };

    if (this.screen === "signup") {
      this.userService.register(formData)
        .then(response => {
          console.log(response);
          this.router.navigate(['/login']);
          this.screen = 'signin';
        })
        .catch(error => {
          this.userService.presentToast('No cumple los requisitos, intente nuevamente');
        });
    } else if (this.screen === "signin") {
      this.userService.login(formData)
        .then(response => {
          console.log(response);
          this.router.navigate(['/home']);
        })
        .catch(error => {
          this.userService.presentToast('Email o Contraseña equivocados, intente nuevamente');
        });
    }
  }
}