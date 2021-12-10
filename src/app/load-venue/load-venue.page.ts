/* eslint-disable prefer-const */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, NgZone } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VenueCrudService } from './../services/venue-crud.service';
import { ArtistCrudService } from '../services/artist-crud.service';
import { FairgroundCrudService } from '../services/fairground-service.service';

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
  info: any;
  //Info del recinto

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private venueCrudService: VenueCrudService,
    private artistCrudService: ArtistCrudService,
    private fairgroundCrudService: FairgroundCrudService
  ) {
    this.venueForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      placeEvent: ['', [Validators.required]],
      idEvento: [''],
      nombreRecinto: [''],
      secuencia: [''],
      codigoPostal: [''],
      latitud: [''],
      altitud: [''],
      direccion: [''],
      numeroExterno: [''],
      numeroInterno: [''],
      nameEvent: ['', [Validators.required]],
      dateEvent: [''],
      artistas: ['', [Validators.required]],
      typeEvent: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getRecintos();
    this.getArtistas();
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

  loadInfo() {
    this.info = this.venueForm.value;

    let idSearch = Object(this.info.placeEvent);
    let values = Object.values(idSearch);
    let idToget = values[0];

    this.fairgroundCrudService.getFairground(idToget).subscribe(
      (response) => {

        let newValues =Object(response);
        this.venueForm.patchValue({



          idEvento: newValues.id,
          nombreRecinto: newValues.fairgroundName,
          secuencia: newValues.sequence,
          codigoPostal: newValues.fairgroundZipCode,
          latitud: newValues.fairgroundLatitude,
          altitud: newValues.fairgroundLongitud,
          direccion: newValues.fairgroundStreet,
          numeroExterno: newValues.fairgroundExternalNumber,
          numeroInterno: newValues.fairgroundInternalNumber


        });
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
