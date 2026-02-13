import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../services/suggestion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchTerm: string = '';
  favorites: Suggestion[] = [];
  showFavorites: boolean = false;
  showRefused: boolean = false;
  suggestions: Suggestion[] = [];

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestions = this.suggestionService.getSuggestions();
  }

  navigateToAddForm(): void {
    this.router.navigate(['/suggestions/add']);
  }

  likeSuggestion(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert(`"${suggestion.title}" a été ajouté aux favoris !`);
    } else {
      alert(`Cette suggestion est déjà dans vos favoris.`);
    }
  }

  removeFromFavorites(suggestion: Suggestion): void {
    this.favorites = this.favorites.filter(fav => fav.id !== suggestion.id);
  }

  toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
  }

  toggleRefused(): void {
    this.showRefused = !this.showRefused;
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm) {
      return this.suggestions;
    }
    
    const searchLower = this.searchTerm.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchLower) ||
      suggestion.category.toLowerCase().includes(searchLower)
    );
  }

  get refusedSuggestions(): Suggestion[] {
    return this.suggestions.filter(s => s.status === 'refusee');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'acceptee':
        return 'status-accepted';
      case 'refusee':
        return 'status-refused';
      case 'en_attente':
        return 'status-pending';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'acceptee':
        return 'ACCEPTÉE';
      case 'refusee':
        return 'REFUSÉE';
      case 'en_attente':
        return 'EN ATTENTE';
      default:
        return status.toUpperCase();
    }
  }
}