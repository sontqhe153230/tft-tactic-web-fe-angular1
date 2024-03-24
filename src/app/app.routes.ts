import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { TeamCompGuideComponent } from './team-comp-guide/team-comp-guide.component';
import { TeamCompBuilderComponent } from './team-comp-builder/team-comp-builder.component';
import { TemaCompGuideDescriptionComponent } from './tema-comp-guide-description/tema-comp-guide-description.component';
import { PlanNoteComponent } from './component/plan-note/plan-note.component';
import { ChampionComponent } from './component/champion/champion.component';
import { ChampionDetailComponent } from './component/champion-detail/champion-detail.component';
import { ItemComponent } from './component/item/item.component';
import { AugumentsComponent } from './auguments/auguments.component';
import { SelectAugumentComponent } from './select-augument/select-augument.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
    },
    
    {
        path: 'Champions',
        loadChildren: () => import('./component/champion/champion.component').then(m => m.ChampionComponent)
    },
    {
        path: 'Home',
        component: HomeComponent,
    },
    {
        path:'Guide/:id',
        component: TeamCompGuideComponent
    },
    {
        path:'Build/:plan',
        component: TeamCompBuilderComponent
    },
    {
        path:'Description',
        component: TemaCompGuideDescriptionComponent
    },
    {
        path:'Note/:plan',
        component: PlanNoteComponent
    },

    {
        path:'Champion',
        component: ChampionComponent
    },
    {
        path:'ChampionDetails/:id',
        component: ChampionDetailComponent
    },
    {
        path:'Items',
        component: ItemComponent
    },
    {
        path:'Auguments',
        component: AugumentsComponent
    },
    {
        path:'SelectAugument',
        component:SelectAugumentComponent
    }
];
