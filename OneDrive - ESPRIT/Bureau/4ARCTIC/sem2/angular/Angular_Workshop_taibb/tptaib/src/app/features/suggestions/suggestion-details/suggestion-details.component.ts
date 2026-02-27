import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {

  suggestion!: Suggestion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

ngOnInit(): void {
  const id = +this.route.snapshot.params['id'];
  this.suggestionService.getSuggestionById(id).subscribe({
    next: (data) => {
      console.log('Données reçues:', data);  // ← AJOUTER
      this.suggestion = data;
    },
    error: (err) => {
      console.error('Suggestion non trouvée', err);
      this.router.navigate(['/notfound']);
    }
  });
}

goToUpdate(): void {
  this.router.navigate(['/suggestions/edit', this.suggestion.id]);
}

  backToList(): void {
    this.router.navigate(['/suggestions']);
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