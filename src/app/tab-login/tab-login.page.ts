// src/app/tab-login/tab-login.page.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab-login',
  templateUrl: './tab-login.page.html',
  styleUrls: ['./tab-login.page.scss'],
  standalone: false,
})
export class TabLoginPage {
  loginData = {
    email: '',
    password: ''
  };

  showPassword = false;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.storage.create();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    try {
      const res: any = await this.http.post('http://localhost:8000/api/login', this.loginData).toPromise();
      console.log('Login berhasil:', res);

      await this.storage.set('token', res.token);
      await this.storage.set('user', res.user);

      const toast = await this.toastCtrl.create({
        message: 'Login berhasil!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      this.navCtrl.navigateRoot('/tabs/tab5');
    } catch (err) {
      console.error('Gagal login:', err);
      const toast = await this.toastCtrl.create({
        message: 'Email atau password salah!',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
