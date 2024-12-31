import { useAuthContext } from "../../contexts/AuthContext";

import Header from "../header/Header";
import UserSection from "../user-section/UserSection";
import Footer from "../footer/Footer";
import Spinner from "../spinner/Spinner";
import { useLogin } from "../../hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
    const { isLoading, isAuthenticated } = useAuthContext();

    const login = useLogin();

    useEffect(() => {
        if (isLoading) {
            login();
        }
    }, [isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />

            <main className='main'>
                {isAuthenticated ? <UserSection /> : <Spinner />}
            </main>

            <Footer />
        </>
    );
}
