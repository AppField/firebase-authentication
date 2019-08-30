import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClient } from '@angular/common/http';
import { i18nPath } from '../utils';
import { RegisterContainerComponent } from './containers/register-container/register-container.component';
import { RegisterPresentationComponent } from './presentations/register-presentation/register-presentation.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, i18nPath('register'), '.json');
}

const routes: Routes = [
{
        path: '',
        component: RegisterContainerComponent
    }
];

@NgModule({
    declarations: [
        RegisterContainerComponent,
        RegisterPresentationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            },
            isolate: true
        })
    ]
})
export class IonicRegisterModule { }
