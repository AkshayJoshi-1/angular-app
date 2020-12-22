import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from './../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService){}

  storeRecipes(): void {
    const recipes = this.recipeService.recipes;
    this.http.post('http://localhost:8080/recipe/saveAll', recipes)
    .subscribe( response => {
      console.log(response);
    });
  }

  fetchRecipes(): Observable<Recipe[]>{
    return this.http.get('http://localhost:8080/recipe/')
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map(recipe => {
            return {...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}
