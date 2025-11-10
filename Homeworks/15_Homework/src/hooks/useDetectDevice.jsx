import { useEffect,useState } from "react"; 

const breakpoints = {
    xs: "576",
    sm: "786",
    md: "992",
    lg: "1200",
};

const deviceHandler = () => {
    const windowWidth = window.innerWidth;

    switch (true) {
        case windowWidth <= parseInt(breakpoints.xs):
            return "Mobile";
        case windowWidth > parseInt(breakpoints.xs) && windowWidth <= parseInt(breakpoints.sm):
            return "Tablet";
        case windowWidth > parseInt(breakpoints.sm) && windowWidth <= parseInt(breakpoints.md):
            return "Laptop";
        case windowWidth > parseInt(breakpoints.md):
            return "Desktop";
        default:
            return "Unknown Device";
    }   
};

function useDetectDevice() {
    const [device, setDevice] = useState(deviceHandler());

    useEffect(() => {
        const handleResize = () => {
            setDevice(deviceHandler());
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return device;
}

export default useDetectDevice;