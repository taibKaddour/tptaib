import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { Router } from '@angular/router';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {

  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];
  searchText: string = '';

  constructor(
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des suggestions', err);
      }
    });
  }

  incrementLikes(suggestion: Suggestion): void {
    this.suggestionService.incrementLikes(suggestion.id).subscribe({
      next: (updatedSuggestion) => {
        suggestion.nbLikes = updatedSuggestion.nbLikes;
      },
      error: (err) => {
        console.error('Erreur lors de l\'incrémentation des likes', err);
      }
    });
  }

  deleteSuggestion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion ?')) {
      this.suggestionService.deleteSuggestion(id).subscribe({
        next: () => {
          this.loadSuggestions(); // Recharger la liste
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
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