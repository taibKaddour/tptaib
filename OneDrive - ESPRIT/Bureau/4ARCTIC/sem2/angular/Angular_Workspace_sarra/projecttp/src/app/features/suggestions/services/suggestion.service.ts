import { Injectable } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      category: 'Activités et événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie et services numériques',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Communication interne',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie et services numériques',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  constructor() { }

  getSuggestions(): Suggestion[] {
    return this.suggestions;
  }

  getSuggestionById(id: number): Suggestion | undefined {
    return this.suggestions.find(s => s.id === id);
  }

  addSuggestion(suggestion: Suggestion): void {
    // Auto-increment ID
    const maxId = Math.max(...this.suggestions.map(s => s.id), 0);
    suggestion.id = maxId + 1;
    suggestion.nbLikes = 0;
    this.suggestions.push(suggestion);
  }

  updateSuggestion(suggestion: Suggestion): void {
    const index = this.suggestions.findIndex(s => s.id === suggestion.id);
    if (index !== -1) {
      this.suggestions[index] = suggestion;
    }
  }

  deleteSuggestion(id: number): void {
    this.suggestions = this.suggestions.filter(s => s.id !== id);
  }
}