import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const login = JSON.parse(localStorage.getItem("login"));
            if (login?.role === "admin") {
                setIsAdmin(true);
            }
        }
    },[]);

    const logout = () => {
        localStorage.removeItem("login");
        Router.push("/login");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg signUpButton text-white fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-3 home" href="/">Cafe Amrit</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='d-flex'>

                        {isAdmin ?

                            <div className='me-3'>
                                <span>Hi Admin!</span>
                                <Link href="/admin" className='text-decoration-none btn addButton text ms-3' >Admin</Link>

                            </div> : <div className='me-3'>
                                <span>Hi User!</span>
                                <Link href="/cart" className='text-decoration-none btn addButton text ms-3'>Cart</Link>
                            </div>}
                        <div className='me-5'>
                            <button className='btn addButton text ' onClick={logout}>Logout</button>
                        </div>

                    </div>
                </div>

            </nav>
        </>
    );
};

export default Navbar;
