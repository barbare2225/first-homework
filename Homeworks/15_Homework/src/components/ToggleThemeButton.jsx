import { useEffect, useState } from "react";


export default function ToggleThemeButton({ setLightMode }) {
    const [warning, setWarning] = useState(false);

    function clickHandler() {
        if (window.innerWidth <= 992) {
            setLightMode(true);
            setWarning(true);
        } else {
            setLightMode(prevMode => !prevMode);
        }
    }

    useEffect(() => {
        const unSubscribe = setTimeout(() => {
            setWarning(false);
        }, 3000);

        return () => clearTimeout(unSubscribe);
    }, [warning]);

    return (
        <div className="btn-div">
            <button onClick={clickHandler} className="toggle-btn">
                Toggle Theme
            </button>
            <span
                style={{
                visibility: `${warning} ? 'visible' : 'hidden'`,
                color: '#dc143c'}}
            >
                Dark theme only allowed for Desktop
            </span>
        </div>
    )

}