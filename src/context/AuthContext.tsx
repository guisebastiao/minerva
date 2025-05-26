import type { AuthDTO } from "@/services/types/AuthDTO";
import type { UserDTO } from "@/services/types/UserDTO";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDTO | null;
  login: (authData: AuthDTO) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      const parsedAuth: AuthDTO = JSON.parse(storedAuth);

      const now = new Date(new Date().toISOString());
      const expires = new Date(parsedAuth.expires);

      if (now >= expires) {
        setAuthenticated(false);
        localStorage.removeItem("auth");
      }

      setAuthenticated(true);
      setUser(parsedAuth.user);
    }
  }, []);

  const login = (authData: AuthDTO) => {
    localStorage.setItem("auth", JSON.stringify(authData));
    setUser(authData.user);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useContextAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContextAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
