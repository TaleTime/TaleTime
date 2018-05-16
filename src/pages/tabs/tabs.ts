import { Component } from '@angular/core';

import { AvailableStoriesPage } from '../availableStories/availableStories';
import { StartPage } from '../start/start';
import { SettingsPage } from '../settings/settings';
import { StoryMenuPage } from '../storyMenu/storyMenu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabs: Array<{ title: string, icon: string, component: any }>;


  constructor() {
    this.tabs = [
      { title: 'APP_MY_STORIES', icon: 'book', component: StoryMenuPage },
      { title: 'APP_NEW_STORIES', icon: 'add-circle', component: AvailableStoriesPage },
      { title: 'APP_SETTINGS', icon: 'settings', component: SettingsPage }
    ];
  }
}
