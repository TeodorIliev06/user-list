import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import UserSection from './components/user-section/UserSection'

import './styles.css'
import { useLogin } from './hooks/useAuth'
import { useEffect } from 'react'
import { AuthContextProvider } from './contexts/AuthContext'
import Home from './components/home/Home'

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
