import {Routes} from '@angular/router';
import {ChatViewComponent} from './chat-view/chat-view.component';
import {EmptyViewComponent} from './empty-view/empty-view.component';

export const routes: Routes = [
  {path: '', component: EmptyViewComponent},
  {path: 'chat/:id', component: ChatViewComponent}

];
