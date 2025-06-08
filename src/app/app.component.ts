import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      document.body.classList.remove('dark'); // Hapus class dark kalau ada
      document.body.setAttribute('color-theme', 'light'); // Paksa light mode
    });
  }
}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
