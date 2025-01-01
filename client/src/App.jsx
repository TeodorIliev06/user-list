import './styles.css'

import Home from './components/home/Home'
import { AuthContextProvider } from './contexts/AuthContext'

function App() {

    return (
        <>
            <AuthContextProvider>
                <Home />
            </AuthContextProvider>
        </>
    );
}

export default App
