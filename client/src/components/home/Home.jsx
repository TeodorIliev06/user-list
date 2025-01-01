import { useEffect } from "react";

import Header from "../header/Header";
import UserSection from "../user-section/UserSection";
import Footer from "../footer/Footer";
import Spinner from "../spinner/Spinner";

import { useAuthContext } from "../../contexts/AuthContext";
import { useLogin } from "../../hooks/useAuth";

export default function Home() {
    const { isLoading, isAuthenticated } = useAuthContext();

    const login = useLogin();

    useEffect(() => {
        if (isLoading) {
            login();
        }
    }, [isLoading]);

    return (
        <>
            <Header />

            <main className='main'>
                {isAuthenticated
                    ? <UserSection />
                    : <Spinner />
                }
            </main>

            <Footer />
        </>
    );
}
