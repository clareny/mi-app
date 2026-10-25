import './styles/tokens.css';
import './styles/site.css';
import './styles/forms.css';
import './styles/music.css';
import './styles/production.css';
import './styles/training.css';
import SiteFooter from './components/site/SiteFooter';
import SiteNav from './components/site/SiteNav';
import SiteBackground from './components/three/SiteBackground';
import useHashRoute from './hooks/useHashRoute';
import HomeView from './views/HomeView';
import MusicView from './views/MusicView';
import ProductionView from './views/ProductionView';
import TrainingView from './views/TrainingView';

function App() {
  const route = useHashRoute();

  return (
    <>
      <SiteBackground route={route} />
      <div className="site">
        <SiteNav route={route} />
        <main key={route} className="site-main">
          {route === 'inicio' && <HomeView />}
          {route === 'musica' && <MusicView />}
          {route === 'servicios' && <ProductionView />}
          {route === 'formacion' && <TrainingView />}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

export default App;
