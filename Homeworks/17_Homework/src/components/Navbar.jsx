import React from "react";
import {Link, useLocation } from "react-router-dom";

export default function Navbar(){
    const location = useLocation();
    return (
        <nav>
            <h1>Navbar</h1>
            <div>
                {location.pathname !== "/" &&(
                    <Link 
                        to={"/"}
                    >
                        Home
                    </Link>
                )}
            </div>
        </nav>
    )
};