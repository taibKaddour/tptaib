import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) {}

  // GET - Récupérer toutes les suggestions
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<any>(this.suggestionUrl).pipe(
      map(response => response.suggestions || response)
    );
  }

  // GET - Récupérer une suggestion par ID
  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<any>(`${this.suggestionUrl}/${id}`).pipe(
      map(response => response.suggestion || response)
    );
  }

  // POST - Ajouter une nouvelle suggestion
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<any>(this.suggestionUrl, suggestion).pipe(
      map(response => response.suggestion || response)
    );
  }

  // PUT - Mettre à jour une suggestion
  updateSuggestion(id: number, suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<any>(`${this.suggestionUrl}/${id}`, suggestion).pipe(
      map(response => response.suggestion || response)
    );
  }

  // DELETE - Supprimer une suggestion
  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionUrl}/${id}`);
  }

  // POST - Incrémenter les likes
  incrementLikes(id: number): Observable<Suggestion> {
    return this.http.post<any>(`${this.suggestionUrl}/${id}/like`, {}).pipe(
      map(response => response.suggestion || response)
    );
  }
}