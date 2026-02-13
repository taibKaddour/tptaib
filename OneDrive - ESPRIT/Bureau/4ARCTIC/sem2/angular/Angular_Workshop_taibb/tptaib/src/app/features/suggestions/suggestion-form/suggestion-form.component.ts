import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: this.getTodayDate(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Getters pour accéder facilement aux contrôles dans le HTML
  get titleControl() { return this.suggestionForm.get('title'); }
  get descriptionControl() { return this.suggestionForm.get('description'); }
  get categoryControl() { return this.suggestionForm.get('category'); }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const newSuggestion: Suggestion = {
        id: this.suggestionService.getNextId(),
        title: this.suggestionForm.get('title')!.value,
        description: this.suggestionForm.get('description')!.value,
        category: this.suggestionForm.get('category')!.value,
        date: new Date(),
        status: 'en_attente',
        nbLikes: 0
      };

      this.suggestionService.addSuggestion(newSuggestion);
      this.router.navigate(['/suggestions']); // ← Étape 8 : redirection
    }
  }
}