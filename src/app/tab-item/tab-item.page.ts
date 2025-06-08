import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.page.html',
  styleUrls: ['./tab-item.page.scss'],
  standalone: false,
})
export class TabItemPage implements OnInit {
  id: string | null = null;
  produk: any = null;
  isVerifiedUser = false;
  isLoggedIn = false;
  token: string = '';  // token string saja
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: Storage
  ) {
    this.storage.create();
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get('id');
    await this.getUserTokenCache();
    await this.loadItem();
  }

  async loadItem() {
    try {
      const data = await this.http.get<any>(`http://localhost:8000/api/items/${this.id}`).toPromise();
      this.produk = data;
    } catch (error) {
      console.error('Gagal ambil data produk:', error);
    }
  }

  async getUserTokenCache() {
    const tokenObj = await this.storage.get('token');
    if (tokenObj) {
      // Kalau tokenObj adalah objek dengan properti access_token
      if (typeof tokenObj === 'object' && tokenObj.access_token) {
        this.token = tokenObj.access_token;
      } else if (typeof tokenObj === 'string') {
        this.token = tokenObj;
      }
    } else {
      this.token = '';
    }
    console.log('Token resolved:', this.token);

    if (this.token) {
      try {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        });
        const response: any = await this.http.get('http://localhost:8000/api/user', { headers }).toPromise();

        if (response?.user) {
          this.user = response.user;
          this.isLoggedIn = true;
          this.isVerifiedUser = this.user.status?.toLowerCase() === 'verified';
        } else {
          this.isLoggedIn = false;
          this.isVerifiedUser = false;
        }
      } catch (error) {
        console.warn('Gagal ambil user:', error);
        this.isLoggedIn = false;
        this.isVerifiedUser = false;
      }
    } else {
      this.isLoggedIn = false;
      this.isVerifiedUser = false;
    }
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'available': return 'success';
      case 'rented': return 'warning';
      case 'maintenance': return 'medium';
      default: return 'dark';
    }
  }

  getStatusLabel(status: string): string {
    switch (status.toLowerCase()) {
      case 'available': return 'Tersedia';
      case 'rented': return 'Sedang Di Sewa';
      case 'maintenance': return 'Dalam Perbaikan';
      default: return 'Tidak Diketahui';
    }
  }

  isAvailable(status: string): boolean {
    return status.toLowerCase() === 'available';
  }

  async sewaSekarang() {
    if (!this.isLoggedIn || !this.isVerifiedUser || !this.produk) {
      alert('Anda harus login dan status harus verified untuk melakukan penyewaan.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,  // token string langsung
      'Content-Type': 'application/json',
    });

    const payload = {
      item_id: this.produk.id,
    };

    try {
      const response = await this.http.post(
        'http://localhost:8000/api/cart-items',
        payload,
        { headers }
      ).toPromise();

      console.log('Berhasil menambahkan ke cart:', response);
      alert('Item berhasil ditambahkan ke keranjang!');
    } catch (error: any) {
      console.error('Gagal menambahkan ke cart:', error);

      if (error.status === 422) {
        alert('Data tidak valid: ' + JSON.stringify(error.error));
      } else if (error.status === 401) {
        alert('Unauthorized: Harap login ulang.');
      } else {
        alert('Gagal menambahkan item ke keranjang. Lihat konsol untuk detail.');
      }
    }
  }
}
