import './App.css';
import Desktop from './components/os/Desktop';
import MobileShowcase from './components/showcase-mobile/MobileShowcase';
import useIsMobile from './hooks/useIsMobile';

function App() {
    const isMobile = useIsMobile();

    return (
        <div className="App">
            {isMobile ? <MobileShowcase /> : <Desktop />}
        </div>
    );
}

export default App;
