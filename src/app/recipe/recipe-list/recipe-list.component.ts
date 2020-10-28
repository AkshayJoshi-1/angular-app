import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Test Recipe 1", "Recipe Description 1", "https://picturetherecipe.com/wp-content/uploads/2020/04/PictureTheRecipe-Butter-Chicken.jpg"),
    new Recipe("Test Recipe 2", "Recipe Description 2", "https://picturetherecipe.com/wp-content/uploads/2020/04/PictureTheRecipe-Butter-Chicken.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipeSelected: Recipe) {
    this.recipeSelected.emit(recipeSelected);
  }

}
