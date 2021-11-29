import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ArtistCrudService } from './../services/artist-crud.service';

@Component({
  selector: 'app-load-artist',
  templateUrl: './load-artist.page.html',
  styleUrls: ['./load-artist.page.scss'],
})
export class LoadArtistPage implements OnInit {
  artistForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private artistCrudService: ArtistCrudService
  ) {
    this.artistForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (!this.artistForm.valid) {
      return false;
    } else {
      this.artistCrudService.createArtist(this.artistForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.artistForm.reset();
            //this.router.navigate(['/load-venue']);
          });
        });
    }
  }
}
