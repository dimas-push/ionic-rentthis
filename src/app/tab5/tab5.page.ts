import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: false,
})
export class Tab5Page {
  isLoggedIn = false;
  user: any = {};

  constructor(private router: Router, private storage: Storage) {
    this.storage.create();
  }

  async ionViewWillEnter() {
    await this.storage.create();
    const user = await this.storage.get('user');
    this.isLoggedIn = !!user;
    if (this.isLoggedIn) {
      this.user = user;
    }
  }

  login() {
    this.router.navigate(['/tabs/tab-login']);
  }

  register() {
    this.router.navigate(['/tabs/tab-register']);
  }

  async logout() {
    await this.storage.remove('token');
    await this.storage.remove('user');
    this.isLoggedIn = false;
    this.user = {};
    this.router.navigate(['/tabs/tab5']);
  }
}
