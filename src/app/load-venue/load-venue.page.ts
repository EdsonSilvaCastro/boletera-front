/* eslint-disable prefer-const */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, NgZone } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VenueCrudService } from './../services/venue-crud.service';
import { ArtistCrudService } from '../services/artist-crud.service';
import { FairgroundCrudService } from '../services/fairground-service.service';
import { CategoryCrudService } from '../services/category-service.service';

@Component({
  selector: 'app-load-venue',
  templateUrl: './load-venue.page.html',
  styleUrls: ['./load-venue.page.scss'],
})
export class LoadVenuePage implements OnInit {
  venueForm: FormGroup;

  //Variables para peticiones.
  recintos: any;
  artistas: any;
  categories: any;
  info: any;
  //Info del recinto

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private venueCrudService: VenueCrudService,
    private artistCrudService: ArtistCrudService,
    private fairgroundCrudService: FairgroundCrudService,
    private categoryCrudService: CategoryCrudService
  ) {
    this.venueForm = this.formBuilder.group({
      artist: this.formBuilder.group({
        name: [''],
        description: [''],
        category: [''],
      }),
      durationInHours: [''],
      startHour: [''],
      weekDay: [''],
      id: [''],
      placeEvent: [''],
      fairground: this.formBuilder.group({
        fairgroundStreet: [''],
        fairgroundExternalNumber: [''],
        fairgroundInternalNumber: [''],
        fairgroundLatitude: [''],
        fairgroundLongitud: [''],
        fairgroundName: [''],
        fairgroundZipCode: [''],
        sequence: ['']
      }),
      nameEvent: [''],
      dateEvent: [''],
      artistas: [''],
      typeEvent: [''],
      percentageComission: [''],
      availability: [''],
      briefDescription: [''],
      category: [''],
      cortesyAmount: [''],
      dateStartEvent: [''],
      dateEndEvent: [''],
    });
  }

  ngOnInit() {
    this.getRecintos();
    this.getArtistas();
    this.getCategories();
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
    this.fairgroundCrudService.getFairgrounds().subscribe(
      (response) => {
        console.log('response', response);
        console.log(response);
        this.recintos = response;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  getArtistas() {
    this.artistCrudService.getArtists().subscribe(
      (response) => {
        console.log('response', response);
        this.artistas = response;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  getCategories() {
    this.categoryCrudService.getCategories().subscribe(
      (response) => {
        console.log('response', response);
        this.categories = response;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  loadInfo() {
    this.info = this.venueForm.value;

    let idSearch = Object(this.info.placeEvent);
    let values = Object.values(idSearch);
    let idToget = values[0];

    this.fairgroundCrudService.getFairground(idToget).subscribe(
      (response) => {
        let newValues = Object(response);
        this.venueForm.patchValue({

          fairground:{
            id: newValues.id,
            fairgroundName: newValues.fairgroundName,
            sequence: newValues.sequence,
            fairgroundZipCode: newValues.fairgroundZipCode,
            fairgroundLatitude: newValues.fairgroundLatitude,
            fairgroundLongitud: newValues.fairgroundLongitud,
            fairgroundStreet: newValues.fairgroundStreet,
            fairgroundExternalNumber: newValues.fairgroundExternalNumber,
            fairgroundInternalNumber: newValues.fairgroundInternalNumber,
          }
        });
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  addNewArtist() {

    let data = this.venueForm.get('artist').value;
    console.log(data);
    if (!this.venueForm.get('artist').valid) {
      return false;
    } else {
      this.artistCrudService
        .createArtist(data)
        .subscribe((response) => {
          this.zone.run(() => {
            this.venueForm.get('artist').reset();
            console.log('success');
          });
        });
    }

  }


  addNewFairground(){
    let data = this.venueForm.get('fairground').value;
    console.log(data);
    if (!this.venueForm.get('fairground').valid) {
      return false;
    } else {
      this.fairgroundCrudService
        .createFairground(data)
        .subscribe((response) => {
          this.zone.run(() => {
            this.venueForm.get('fairground').reset();
            console.log('success');
          });
        });
    }
  }
}
