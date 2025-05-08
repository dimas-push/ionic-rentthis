import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-register',
  templateUrl: './tab-register.page.html',
  styleUrls: ['./tab-register.page.scss'],
  standalone: false,
})
export class TabRegisterPage {
  user = {
    name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: ''
  };  

  errorMessage = '';

  showPassword = false;
  showPasswordConfirm = false;

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirm') {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    }
  }


  constructor(private http: HttpClient, private navCtrl: NavController) {}

  register() {
    this.http.post('http://localhost:8000/api/register', this.user).subscribe({
      next: (res) => {
        console.log('Berhasil daftar:', res);
        this.errorMessage = '';
        this.navCtrl.navigateRoot('/tabs/tab5');
      },
      error: (err) => {
        console.error('Gagal daftar:', err);
  
        if (err.status === 400 && err.error && typeof err.error === 'object') {
          const errors = err.error.errors as { [key: string]: string[] };
          const firstKey = Object.keys(errors)[0];
          this.errorMessage = errors[firstKey][0];
        } else {
          this.errorMessage = 'Terjadi kesalahan saat daftar.';
        }
      }
    });
  }  
}
