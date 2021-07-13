import './index.css';
import { ContextProvider } from './utils/Context';
import Layout from './components/Layouts/Layout';

function App() {
  // window.localStorage.setItem('UsuarioId', 1);
  // window.localStorage.setItem('Nombres', 'Luis');
  // window.localStorage.setItem('Apellidos', 'Rondon');
  return (
    <ContextProvider>
        <Layout />
    </ContextProvider>
  );
}

export default App;