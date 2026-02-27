import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;
  isEditMode = false;
  suggestionId!: number;

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
    private route: ActivatedRoute,
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

    // Vérifier si on est en mode édition
    this.suggestionId = +this.route.snapshot.params['id'];
    if (this.suggestionId) {
      this.isEditMode = true;
      this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
        next: (data) => {
          this.suggestionForm.patchValue(data);
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la suggestion', err);
        }
      });
    }
  }

  getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  get titleControl() { return this.suggestionForm.get('title'); }
  get descriptionControl() { return this.suggestionForm.get('description'); }
  get categoryControl() { return this.suggestionForm.get('category'); }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const suggestionData: Suggestion = {
        id: this.suggestionId || 0,
        title: this.suggestionForm.get('title')!.value,
        description: this.suggestionForm.get('description')!.value,
        category: this.suggestionForm.get('category')!.value,
        date: new Date(),
        status: 'en_attente',
        nbLikes: 0
      };

      if (this.isEditMode) {
        // UPDATE
        this.suggestionService.updateSuggestion(this.suggestionId, suggestionData).subscribe({
          next: () => {
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour', err);
          }
        });
      } else {
        // ADD
        this.suggestionService.addSuggestion(suggestionData).subscribe({
          next: () => {
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout', err);
          }
        });
      }
    }
  }
}