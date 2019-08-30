import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { LoginPresentationComponent } from './presentations/login-presentation/login-presentation.component';
import { HttpClient } from '@angular/common/http';
import { i18nPath } from '../utils';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, i18nPath('login'), '.json');
}

const routes: Routes = [
    {
        path: '',
        component: LoginContainerComponent
    }
];

@NgModule({
    declarations: [
        LoginContainerComponent,
        LoginPresentationComponent
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
export class IonicLoginModule { }
