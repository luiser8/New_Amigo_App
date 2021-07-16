import './index.css';
import { ContextProvider } from './utils/Context';
import Layout from './components/Layouts/Layout';

function App() {
  return (
    <ContextProvider>
        <Layout />
    </ContextProvider>
  );
}

export default App;