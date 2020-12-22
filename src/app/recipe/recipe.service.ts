import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping/shopping.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // recipes: Recipe[] = [
    //     new Recipe('Test Recipe 1',
    //         'Recipe Description 1',
    //         'https://picturetherecipe.com/wp-content/uploads/2020/04/PictureTheRecipe-Butter-Chicken.jpg',
    //         [
    //             new Ingredient('Bread', 1), new Ingredient('Meat', 2)
    //         ]),
    //     new Recipe('Test Recipe 2',
    //         'Recipe Description 2',
    //         'https://picturetherecipe.com/wp-content/uploads/2020/04/PictureTheRecipe-Butter-Chicken.jpg',
    //         [
    //             new Ingredient('Apple', 1), new Ingredient('Sugar', 3)
    //         ])
    // ];

    recipes: Recipe[] = [];

    constructor(private shoppingService: ShoppingService) {}

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
      return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void {
        this.shoppingService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe): void {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe): void {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number): void {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]): void {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
}
