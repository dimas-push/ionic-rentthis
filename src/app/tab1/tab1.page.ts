import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  items: any[] = [];
  filteredItems: any[] = [];
  selectedBrand: string = '';
  minPrice: number = 0;
  maxPrice: number = 100000000;
  sortOrder: string = '';
  brands: string[] = [];
  selectedItem: any = null;

  // Tambahan untuk pencarian
  isSearchVisible: boolean = false;

  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getItems();
  }

  // Ambil data dari API
  getItems() {
    this.http.get<any[]>('http://localhost:8000/api/items').subscribe(
      (data) => {
        this.items = data;
        this.filteredItems = data;
        this.extractBrands(data);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  // Ekstrak brand unik dari data
  extractBrands(data: any[]) {
    const uniqueBrands = new Set(data.map(item => item.brand));
    this.brands = Array.from(uniqueBrands);
  }

  // Gabungan filter: pencarian, brand, harga, dan sorting
  applyFilter() {
    const query = this.searchQuery.trim().toLowerCase();

    let filtered = this.items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(query);
      const matchBrand = this.selectedBrand ? item.brand === this.selectedBrand : true;
      const matchPrice = item.price >= this.minPrice && item.price <= this.maxPrice;
      return matchSearch && matchBrand && matchPrice;
    });

    // Urutkan jika diminta
    if (this.sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    this.filteredItems = filtered;
  }

  // Reset semua filter dan pencarian
  resetFilter() {
    this.selectedBrand = '';
    this.minPrice = 0;
    this.maxPrice = 100000000;
    this.sortOrder = '';
    this.searchQuery = '';
    this.filteredItems = this.items;
  }

  // Tangani klik item
  onItemClick(item: any) {
    this.selectedItem = item;
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.searchQuery = ''; // reset pencarian jika ditutup
      this.applyFilter();
    }
  }  

  handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
}
