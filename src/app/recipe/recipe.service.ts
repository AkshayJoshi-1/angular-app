import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping/shopping.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipes: Recipe[] = [
        new Recipe("Test Recipe 1",
            "Recipe Description 1",
            "https://picturetherecipe.com/wp-content/uploads/2020/04/PictureTheRecipe-Butter-Chicken.jpg",
            [
                new Ingredient('Bread', 1), new Ingredient('Meat', 2)
            ]),
        new Recipe("Test Recipe 2",
            "Recipe Description 2",
            "https://picturetherecipe.com/wp-content/uploads/2020/04/PictureTheRecipe-Butter-Chicken.jpg",
            [
                new Ingredient('Apple', 1), new Ingredient('Sugar', 3)
            ])
    ];

    recipeSelected = new EventEmitter<Recipe>();

    constructor(private shoppingService: ShoppingService) {}

    getRecipe(): Recipe[] {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void {
        this.shoppingService.addIngredients(ingredients);
    }
}