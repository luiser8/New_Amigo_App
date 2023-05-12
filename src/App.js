import './index.css';
import { ContextProvider } from './context/Context';
import Layout from './components/Layouts/Layout';

function App() {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
}

export default App;