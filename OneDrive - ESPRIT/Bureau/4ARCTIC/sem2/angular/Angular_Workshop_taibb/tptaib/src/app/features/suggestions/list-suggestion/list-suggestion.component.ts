import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { Router } from '@angular/router';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {

  favorites: Suggestion[] = [];
  searchText: string = '';

  constructor(
    private router: Router,
    public suggestionService: SuggestionService
  ) {}

  get suggestions(): Suggestion[] {
    return this.suggestionService.getSuggestions();
  }

  incrementLikes(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert(`${suggestion.title} ajouté aux favoris !`);
    } else {
      alert('Cette suggestion est déjà dans vos favoris !');
    }
  }

  goToForm(): void {
    this.router.navigate(['/suggestions/add']);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchText) {
      return this.suggestions;
    }
    const search = this.searchText.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(search) ||
      suggestion.category.toLowerCase().includes(search)
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'acceptee': return 'status-acceptee';
      case 'refusee': return 'status-refusee';
      case 'en_attente': return 'status-attente';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'acceptee': return 'Acceptée';
      case 'refusee': return 'Refusée';
      case 'en_attente': return 'En attente';
      default: return status;
    }
  }
}