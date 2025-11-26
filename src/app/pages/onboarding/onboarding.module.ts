import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { OnboardingPage } from './onboarding.page';
import { GoogleOptionComponent } from './components/google-option/google-option.component';
import { UploadOptionComponent } from './components/upload-option/upload-option.component';
import { ManualOptionComponent } from './components/manual-option/manual-option.component';
import { SamplePreviewModalComponent } from './components/sample-preview-modal/sample-preview-modal.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OnboardingPage,
    GoogleOptionComponent,
    UploadOptionComponent,
    ManualOptionComponent,
    SamplePreviewModalComponent
  ]
})
export class OnboardingPageModule {}
