import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private RecipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.RecipeService.getRecipes();
    this.http
      .put(
        'https://recipes-application-4c80f-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(
        'https://recipes-application-4c80f-default-rtdb.firebaseio.com/recipes.json'
      )
      .subscribe((recipes) => {
        this.RecipeService.setRecipes(recipes);
      });
  }
}
