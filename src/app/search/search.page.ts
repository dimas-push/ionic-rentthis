import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage implements OnInit {

  searchQuery: string = '';
searchHistory: string[] = [];
items: any[] = []; // Semua item
filteredItems: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Kamu bisa fetch data dari API juga di sini
    this.items = [
      { id: 1, name: 'Toyota Avanza', description: 'MPV Keluarga' },
      { id: 2, name: 'Honda Jazz', description: 'Hatchback sporty' },
      { id: 3, name: 'Suzuki Ertiga', description: 'Mobil keluarga irit' },
      // Tambah data lainnya
    ];
    this.filteredItems = this.items;
  }

  applySearch() {
  const query = this.searchQuery.toLowerCase();
  this.filteredItems = this.items.filter(item =>
    item.name.toLowerCase().includes(query)
  );
}

  goToDetail(item: any) {
    // Misalnya redirect ke detail page
    this.router.navigate(['/item-detail', item.id]);
  }

  onIconClick() {
  if (this.searchQuery) {
    this.searchQuery = '';
    this.filteredItems = this.items; // reset hasil
  }
}

}
