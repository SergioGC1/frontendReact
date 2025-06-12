import { Navigate } from "react-router-dom";

export default function RutaPrivada({ children }) {
    const token = localStorage.getItem("access");

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
}
