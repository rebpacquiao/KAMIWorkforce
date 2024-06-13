import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (com) => com.DashboardComponent
      ),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./components/signin/signin.component').then(
        (com) => com.SigninComponent
      ),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/post-list-page/post-list-page.component').then(
        (com) => com.PostListPageComponent
      ),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./pages/single-post/single-post.component').then(
        (com) => com.SinglePostComponent
      ),
  },
  {
    path: 'album',
    loadComponent: () =>
      import('./pages/album/album.component').then((com) => com.AlbumComponent),
  },
  {
    path: 'single-album/:id',
    loadComponent: () =>
      import('./pages/single-album/single-album.component').then(
        (com) => com.SingleAlbumComponent
      ),
  },
  {
    path: 'photo',
    loadComponent: () =>
      import('./pages/photos/photos.component').then(
        (com) => com.PhotosComponent
      ),
  },
  {
    path: 'single-photo/:id',
    loadComponent: () =>
      import('./pages/single-photo/single-photo.component').then(
        (com) => com.SinglePhotoComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/signin/signin.component').then(
        (com) => com.SigninComponent
      ),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./components/signin/signin.component').then(
        (com) => com.SigninComponent
      ),
  },
];
