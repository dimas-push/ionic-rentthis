import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  items: any[] = [];
  filteredItems: any[] = [];

  // Filter
  selectedBrand: string = '';
  selectedType: string = '';
  minPrice: number = 0;
  maxPrice: number = 100000000;
  sortOrder: string = '';

  // Dropdown options
  brands: string[] = [];
  types: string[] = [];

  // UI
  selectedItem: any = null;
  isSearchVisible: boolean = false;
  searchQuery: string = '';

  typeLabels: any = {
    car: 'Mobil',
    motorcycle: 'Motor',
    other: 'Lainnya'
  };
  

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.http.get<any[]>('http://localhost:8000/api/items').subscribe(
      (data) => {
        this.items = data;
        this.filteredItems = data;
        this.extractBrands(data);
        this.extractTypes(data);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  extractBrands(data: any[]) {
    const uniqueBrands = new Set(data.map(item => item.brand));
    this.brands = Array.from(uniqueBrands);
  }

  extractTypes(data: any[]) {
    const allowedTypes = ['car', 'motorcycle', 'other'];
    const uniqueTypes = new Set(data.map(item => item.type).filter(type => allowedTypes.includes(type)));
    this.types = Array.from(uniqueTypes);
  }  

  applyFilter() {
    const query = this.searchQuery.trim().toLowerCase();

    let filtered = this.items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(query);
      const matchBrand = this.selectedBrand ? item.brand === this.selectedBrand : true;
      const matchType = this.selectedType ? item.type === this.selectedType : true;
      const matchPrice = item.price >= this.minPrice && item.price <= this.maxPrice;

      return matchSearch && matchBrand && matchType && matchPrice;
    });

    if (this.sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    this.filteredItems = filtered;
  }

  resetFilter() {
    this.selectedBrand = '';
    this.selectedType = '';
    this.minPrice = 0;
    this.maxPrice = 100000000;
    this.sortOrder = '';
    this.searchQuery = '';
    this.filteredItems = this.items;
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.searchQuery = '';
      this.applyFilter();
    }
  }

  handleRefresh(event: CustomEvent) {
    this.getItems();
    setTimeout(() => {
      (event.target as HTMLIonRefresherElement).complete();
    }, 1000);
  }

  onItemClick(item: any) {
    this.selectedItem = item;
    this.router.navigate(['/tabs/tab-item', item.id]);
  }

  getStatusLabel(status: string): string {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'Tersedia';
      case 'rented':
        return 'Tidak Tersedia';
      case 'maintenance':
        return 'Dalam Perbaikan';
      default:
        return status;
    }
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'success';
      case 'rented':
        return 'danger';
      case 'maintenance':
        return 'medium';
      default:
        return 'dark';
    }
  }
}
