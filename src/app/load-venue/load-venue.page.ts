import { Component, OnInit, NgZone } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VenueCrudService } from './../services/venue-crud.service';

@Component({
  selector: 'app-load-venue',
  templateUrl: './load-venue.page.html',
  styleUrls: ['./load-venue.page.scss'],
})
export class LoadVenuePage implements OnInit {
  venueForm: FormGroup;

  recintos: any;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private venueCrudService: VenueCrudService
  ) {
    this.venueForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      placeEvent: ['Valor1', [Validators.required]],
      nameEvent: ['', [Validators.required]],
      dateEvent: [''],
      artistas: ['', [Validators.required]],
      typeEvent: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getRecintos();
  }

  onSubmit() {
    console.log(this.venueForm.value);
    if (!this.venueForm.valid) {
      return false;
    } else {
      this.venueCrudService
        .createVenue(this.venueForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.venueForm.reset();
            //this.router.navigate(['/home']);
            console.log('success');
          });
        });
    }
  }
  getRecintos() {
    this.venueCrudService.getVenues().subscribe(
      (response) => {
        console.log('response', response);
        this.recintos = response;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
