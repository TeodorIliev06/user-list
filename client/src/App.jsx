import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import UserSection from './components/user-section/UserSection'

import './styles.css'
import { useLogin } from './hooks/useAuth'
import { useEffect } from 'react'

function App() {
    const login = useLogin();

    useEffect(() => {
        (async () => {
            try {
                await login();
            } catch (err) {
                console.error("Auto-login failed", err.message);
            }
        })();
    }, [login]);

    return (
        <>
            <Header />

            <main className='main'>
                <UserSection />
            </main>

            <Footer />
        </>

    )
}

export default App
