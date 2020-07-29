import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patient-menu',
  templateUrl: './patient-menu.component.html',
  styleUrls: ['./patient-menu.component.scss']
})
export class PatientMenuComponent implements OnInit {

  private idPatient: string;
    
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .pipe(
      map((params: any) => this.idPatient = params['id']),
    ).subscribe();
  }

}
