import React from "react";
import characters from "../data/data.json";
import {Link, useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    return(
        <section>
            <h1>Naruto</h1>

            <div>
                {characters.map(({id, character, about, factId, imageUrl})=>(
                    <div key={id}>
                        <img  src={imageUrl}  alt={character} />
                        <h3>{character}</h3>
                        <p>{about}</p>
                        <div>
                            <button
                                onClick={()=>
                                    factId ? navigate(`/fact/${factId}`) : navigate("/404")
                                }
                            >
                                Fact
                            </button>
                            <Link 
                                to={`/about/${id}`}
                            >
                                Show more
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}