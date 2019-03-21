import HomePage from './container/HomePage'
import NewReleasePage from './container/NewReleases'
import LibraryPage from './container/LibraryPage'
import GenresPage from './container/Genres'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    exact: true
  },
  {
    path: '/callback',
    name: 'HomePage',
    component: HomePage,
    exact: true
  },
  {
    path: '/new-releases',
    name: 'NewReleases',
    component: NewReleasePage,
    exact: true
  },
  {
    path: '/new-releases/callback',
    name: 'NewReleases',
    component: NewReleasePage,
    exact: true
  },
  {
    path: '/genres',
    name: 'Genres',
    component: GenresPage,
    exact: true
  },
  {
    path: '/genres/callback',
    name: 'Genres',
    component: GenresPage,
    exact: true
  },
  {
    path: '/library',
    name: 'LibraryPage',
    component: LibraryPage,
    exact: true
  },
  {
    path: '/library/callback',
    name: 'LibraryPage',
    component: LibraryPage,
    exact: true
  }
]

export default routes
