import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe[]>{

  constructor(private dataStorgeService: DataStorageService, private recipeService: RecipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {

    if(this.recipeService.getRecipes().length === 0) {
      return this.dataStorgeService.fetchRecipes();
    } else {
      return this.recipeService.getRecipes();
    }
  }

}
