import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  
  searchQuery: string = '';
  items = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' }
  ];

  get filteredItems() {
    return this.items.filter(item => 
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  constructor() {}

}
