/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable no-var */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, NgZone } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { VenueCrudService } from './../services/venue-crud.service';
import { ArtistCrudService } from '../services/artist-crud.service';
import { FairgroundCrudService } from '../services/fairground-service.service';
import { CategoryCrudService } from '../services/category-service.service';
import { AlertController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  currentSelection: string;
  //Info del recinto

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private venueCrudService: VenueCrudService,
    private artistCrudService: ArtistCrudService,
    private fairgroundCrudService: FairgroundCrudService,
    private categoryCrudService: CategoryCrudService,
    public alertController: AlertController
  ) {
    this.venueForm = this.formBuilder.group({
      artists: [''],
      availability: [''],
      briefDescription: [''],
      category: [''],
      cortesyAmount: [''],
      dateStartEvent: [''],
      dateEndEvent: [''],
      eventSchedules:this.formBuilder.array([ this.addHorarioFormGroup()]),
      fairground: this.formBuilder.group({
        fairgroundStreet: [''],
        fairgroundExternalNumber: [''],
        fairgroundInternalNumber: [''],
        fairgroundLatitude: [''],
        fairgroundLongitud: [''],
        fairgroundName: [''],
        fairgroundZipCode: [''],
        sequence: [''],
      }),
      nameEvent: [''],
      percentageComission: [''],
    });
  }



  ngOnInit() {
    this.getRecintos();
    this.getArtistas();
    this.getCategories();
  }

  addHorarioButtonClick(): void{

  (<FormArray>this.venueForm.get('eventSchedules')).push(this.addHorarioFormGroup());

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
    this.info = this.venueForm.get('fairground').value;

    let idSearch = Object(this.info.fairgroundName);
    let values = Object.values(idSearch);
    let idToget = values[0];

    this.fairgroundCrudService.getFairground(idToget).subscribe(
      (response) => {
        let newValues = Object(response);
        this.venueForm.patchValue({
          fairground: {
            fairgroundName: newValues.fairgroundName,
            sequence: newValues.sequence,
            fairgroundZipCode: newValues.fairgroundZipCode,
            fairgroundLatitude: newValues.fairgroundLatitude,
            fairgroundLongitud: newValues.fairgroundLongitud,
            fairgroundStreet: newValues.fairgroundStreet,
            fairgroundExternalNumber: newValues.fairgroundExternalNumber,
            fairgroundInternalNumber: newValues.fairgroundInternalNumber,
          },
        });
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  addNewArtist(newArtist) {

    this.artistCrudService
    .createArtist(newArtist)
    .subscribe((response) => {
      this.zone.run(() => {
        console.log('success from outside');
      });
    });
  }

  addNewFairground(newOne) {

    this.fairgroundCrudService
      .createFairground(newOne)
      .subscribe((response) => {
        this.zone.run(() => {
          console.log('success from outside');
        });
      });

  }

  async inputCustomFairground() {
    await this.alertController.create({
      header: 'Ingrese los datos:',
      inputs: [
        {
          type: 'text',
          name: 'newFairground',
          label: 'Nombre del lugar.',
          placeholder: 'Nombre del lugar.'
        },
        {
          type: 'text',
          name: 'newSequence',
          label: 'Secuencia.',
          placeholder: 'Secuencia.'
        },
        {
          type: 'text',
          name: 'newZipcode',
          label: 'Codigo postal.',
          placeholder: 'Codigo postal.'
        },
        {
          type: 'text',
          name: 'newLatitude',
          label: 'Latitud.',
          placeholder: 'Latitud.'
        },
        {
          type: 'text',
          name: 'newLongitud',
          label: 'Longitud.',
          placeholder: 'Longitud.'
        },
        {
          type: 'text',
          name: 'newAddress',
          label: 'Dirección.',
          placeholder: 'Dirección.'
        },
        {
          type: 'text',
          name: 'newExternalNumber',
          label: 'Numero Exterior.',
          placeholder: 'Numero Exterior.'
        },
        {
          type: 'text',
          name: 'newInternalNumber',
          label: 'Numero Interior.',
          placeholder: 'Numero Interior.'
        }


      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok', handler: (res) => {

            var item = {

              fairgroundStreet: res.newAddress,
              fairgroundExternalNumber: res.newExternalNumber,
              fairgroundInternalNumber: res.newInternalNumber,
              fairgroundLatitude: res.newLatitude,
              fairgroundLongitud: res.newLongitud,
              fairgroundName: res.newFairground,
              fairgroundZipCode: res.newZipcode,
              sequence: res.newSequence

            };

            console.log(item);

            this.addNewFairground(item);

          }
        }],
    }).then(res => res.present());


  }


  async inputCustomArtist() {
    await this.alertController.create({
      header: 'Ingrese los datos:',
      inputs: [
        {
          type: 'text',
          name: 'newName',
          label: 'Nombre',
          placeholder: 'Nombre'
        },
        {
          type: 'text',
          name: 'newDescription',
          label: 'Descripción',
          placeholder: 'Descripción'
        },
        {
          type: 'text',
          name: 'newCategory',
          label: 'Categoria',
          placeholder: 'Categoria'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok', handler: (res) => {

            var newArtist = {

                category: res.newCategory,
                description: res.newDescription,
                name: res.newName

            };

            console.log(newArtist);

            this.addNewArtist(newArtist);

          }
        }],
    }).then(res => res.present());


  }

  addHorarioFormGroup(): FormGroup {

   return this.formBuilder.group({
      durationInHours: [''],
      startHour: [''],
      weekDay: [''],
    });
  }
}
