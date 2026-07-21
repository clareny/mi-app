import './App.css';
import About from './components/About';
import Contact from './components/contact';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Services from './components/Services';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">
        <Home />
        <About />
        <Contact />
        <Services />
      </main>
    </div>
  );
}

export default App;
