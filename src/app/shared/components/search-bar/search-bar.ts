import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
})
export class SearchBarComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }
}
