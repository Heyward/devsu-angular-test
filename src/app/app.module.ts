import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient} from '@angular/common/http';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';
import {RouterModule} from '@angular/router';



import { AppComponent } from './app.component';

bootstrapApplication(AppComponent,
  {providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideHttpClient()
  ]})
.catch(err => console.error(err));

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [],
  bootstrap: [],
  exports: []
})




export class AppModule { }
