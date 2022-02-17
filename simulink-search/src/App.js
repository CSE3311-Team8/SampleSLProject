

import Navbar from './Navbar';

import Home from './Home';

function App() {
  const title = 'Simulink Search';

  //additional components are nested in App.js
  return (
      
    <div className="App">
      
      <div className="content">
      <h1>Simulink</h1>
        <Navbar/>
        <Home/>
       
        
      </div>
      
    </div>
  );
}

export default App;
