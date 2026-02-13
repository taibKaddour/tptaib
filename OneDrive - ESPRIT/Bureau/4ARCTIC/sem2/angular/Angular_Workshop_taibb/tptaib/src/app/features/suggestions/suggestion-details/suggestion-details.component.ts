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
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const found = this.suggestionService.getSuggestionById(id);
      if (found) {
        this.suggestion = found;
      } else {
        this.router.navigate(['/notfound']);
      }
    });
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