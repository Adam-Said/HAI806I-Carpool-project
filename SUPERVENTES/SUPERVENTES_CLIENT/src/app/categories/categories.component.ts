import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public user: Observable<string>;
  public categories: String[] = new Array();

  constructor(private router: Router,
              private authService: AuthentificationService,
              private produitsService: ProduitsService) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.produitsService.getCategories().subscribe(categories => {
         this.categories = categories;
    });
  }

  produitsParCategorie(categorie:any) {
    this.router.navigate(['/produits', categorie]);
  }
}
