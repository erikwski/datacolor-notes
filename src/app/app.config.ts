import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Language } from './shared/models/language.model';
import { FakeBackendService } from './core/fake-backend.service';
import { ServerKey } from './shared/models/server-key.model';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/** Initialize translation before load the app */
export function appInitializerFactory(translate: TranslateService) {
  return () => {
    //retrieve the preferred language, if no exist english will be setted
    const language =
      localStorage.getItem(ServerKey.LANGUAGE) ?? Language.ENGLISH;
    translate.setDefaultLang(language);

    return translate.use(language);
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true,
    },
  ],
};
