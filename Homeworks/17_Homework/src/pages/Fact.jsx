import React from "react";
import { useParams } from "react-router-dom";
import characters from "../data/data.json";

export default function Fact(){
    const {factId}=useParams();

    return(
        <section>
            <h1>Fact</h1>
            {characters
                .filter(({id})=>id===parseInt(factId))
                .map(({id,fact})=>(
                    <div key={id}>
                        <h3>{fact}</h3>
                    </div>
                ))
            }
        </section>
    )
}