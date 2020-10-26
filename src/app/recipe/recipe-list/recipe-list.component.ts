import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Test Recipe", "Recipe Description", "https://picturetherecipe.com/wp-content/uploads/2020/04/PictureTheRecipe-Butter-Chicken.jpg"),
    new Recipe("Test Recipe", "Recipe Description", "https://picturetherecipe.com/wp-content/uploads/2020/04/PictureTheRecipe-Butter-Chicken.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
