import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) editForm: NgForm;

  editMode: boolean;
  editedItemIndex: number;
  subscription: Subscription;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingService.getIngredient(index);

          this.editForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
    );
  }

  onItemAdded(form: NgForm): void {
    const value = form.value;

    if (!this.editMode) {
      this.shoppingService.addIngredient(new Ingredient(value.name, value.amount));
    } else {
      this.shoppingService.updateIngredient(this.editedItemIndex, value);
    }

    this.clearForm();
  }

  clearForm(): void {
    this.editForm.reset();
    this.editMode = false;
  }

  deleteItem(): void {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

}
