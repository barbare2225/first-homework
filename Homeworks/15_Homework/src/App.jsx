import './App.css';
import useLocalStorage from "./hooks/useLocalStorage"
import useWindowResize from "./hooks/useWindowResize"
import useDetectDevice from "./hooks/useDetectDevice"
import ToggleThemeButton from "./components/ToggleThemeButton"

function App() {
  const [lightMode, setLightMode] = useLocalStorage('mode', true)
  const {width} = useWindowResize()
  const device = useDetectDevice()
  return (
    <div
      className="container"
      style={{
        backgroundColor: lightMode ? 'white' : 'black',
        color: lightMode ? 'black' : 'white',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div className="text-wrapper">
        <h1>{device}</h1>
      </div>
      <ToggleThemeButton setLightMode={setLightMode}/>
    </div>

  );
}

export default App;
