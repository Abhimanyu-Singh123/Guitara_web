import { useNavigate } from "react-router-dom";

export function useAuthNavigation() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    };

    return { goToLogin };
}