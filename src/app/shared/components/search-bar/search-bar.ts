import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-6">
      <input
        type="text"
        placeholder="Buscar produto..."
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchChange()"
        class="w-full px-4 py-3 rounded-xl border border-gray-400 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </div>
  `,
})
export class SearchBarComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }
}
