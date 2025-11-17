import React from "react";
import Navbar from "../components/Navbar";

export default function Layout({ children }){
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                <div>{children}</div>
            </main>
        </div>
    )
}