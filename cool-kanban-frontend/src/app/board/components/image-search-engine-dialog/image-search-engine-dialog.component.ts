import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsplashService } from '@core/http/unsplash.service';
import { UnsplashImage } from '@shared/models/unsplash-image';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-search-engine-dialog',
  templateUrl: './image-search-engine-dialog.component.html',
  styleUrls: ['./image-search-engine-dialog.component.scss'],
})
export class ImageSearchEngineDialogComponent implements OnInit {
  unsplashImages$: Observable<UnsplashImage[]>;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unsplashSvc: UnsplashService,
    public dialogRef: MatDialogRef<ImageSearchEngineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public image: UnsplashImage
  ) {}

  ngOnInit(): void {
    console.log(this.image);
    this.formGroup = this.formBuilder.group({
      query: ['', [Validators.required]],
    });
  }

  searchPhotos(): void {
    if (this.formGroup.invalid) return;

    const query: string = this.formGroup.get('query').value;
    this.unsplashImages$ = this.unsplashSvc.getMany(query);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
