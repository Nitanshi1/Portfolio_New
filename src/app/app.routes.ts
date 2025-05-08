import { Routes } from '@angular/router';
import { HeroComponent } from './layouts/hero/hero.component';
import { AboutComponent } from './pages/about/about.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
export const routes: Routes = [
    { path: '', redirectTo: 'hero', pathMatch: 'full' },
    { path: 'hero', component: HeroComponent },
    { path: 'about', component: AboutComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'skills', component: SkillsComponent },
    { path: 'contact', component: ContactComponent }
  ];
