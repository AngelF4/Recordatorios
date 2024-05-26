import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  screen: any = 'signin';
  email: string = '';
  password: string = '';
  name: string = '';
  user_image: string = ''; 

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  change(event: any) {
    this.screen = event;
  }

  async onSubmit() {
    const formData = {
      name: this.name, 
      email: this.email,
      password: this.password,
      user_image: this.user_image 
    };

    if (this.screen === 'signup') {
      try {
        await this.userService.register(formData);
        this.router.navigate(['/login']);
        this.screen = 'signin';
      } catch (error) {
        this.userService.presentToast('No cumple los requisitos, intente nuevamente');
      }
    } else if (this.screen === 'signin') {
      try {
        await this.userService.login(formData);
        this.router.navigate(['/home']);
      } catch (error) {
        this.userService.presentToast('Email o Contraseña equivocados, intente nuevamente');
      }
    }
    else if (this.screen === 'forget') {
      try {
        await this.userService.resetPassword(this.email);
        this.userService.presentToast('Se ha enviado un correo electrónico para restablecer la contraseña.');
        this.router.navigate(['/login']);
        this.screen = 'signin';
      } catch (error) {
        this.userService.presentToast('Error al enviar el correo electrónico para restablecer la contraseña.');
      }
    }
  }

}