import type { AuthDTO } from "@/services/types/AuthDTO";
import type { UserDTO } from "@/services/types/UserDTO";
import { queryClient } from "@/context/QueryContext";
import { toast } from "sonner";
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
  isAuthenticated: boolean | null;
  user: UserDTO | null;
  login: (authData: AuthDTO) => void;
  logout: () => void;
  renameUser: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);

  const [user, setUser] = useState<UserDTO | null>(null);

  const checkAuth = () => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      const parsedAuth: AuthDTO = JSON.parse(storedAuth);

      const now = new Date(new Date().toISOString());
      const expires = new Date(parsedAuth.expires);

      if (now >= expires) {
        toast.info("Login expirado, faça seu login novamente");
        setAuthenticated(false);
        localStorage.removeItem("auth");
        return;
      }

      setAuthenticated(true);
      setUser(parsedAuth.user);
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("checkAuth", checkAuth);
    return () => window.removeEventListener("checkAuth", checkAuth);
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
    queryClient.clear();
  };

  const renameUser = (name: string) => {
    const storedAuth = localStorage.getItem("auth");
    const storage: AuthDTO = JSON.parse(storedAuth!);
    storage.user.name = name;
    localStorage.setItem("auth", JSON.stringify(storage));
    setUser(storage.user);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, renameUser }}
    >
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
