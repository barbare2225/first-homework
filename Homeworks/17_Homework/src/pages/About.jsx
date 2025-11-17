import React from "react"
import { useParams } from "react-router-dom";
import characters from "../data/data.json";

export default function About(){
    const {aboutId}=useParams();

    return (
        <section>
            <h1>About</h1>
            {characters
                .filter(({id})=>id===parseInt(aboutId))
                .map(({id,character, about,imageUrl})=>(
                    <div key={id}>
                        <img src={imageUrl} alt={character} />
                        <h3>{character}</h3>
                        <p>{about}</p>
                    </div>
                ))}
        </section>
    )
}