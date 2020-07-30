import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    
  }

  navigateTo(link: string) { 
     this.router.navigate([this.router.url.replace('/cards', link)]);
  }

}
