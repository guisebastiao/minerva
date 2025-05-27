import { Bolt, Globe, Home, SquareLibrary, SquarePlus } from "lucide-react";
import styles from "@/components/Header/style.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";
import { Button } from "../Button";
import clsx from "clsx";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContextAuth();

  return (
    <header className={styles.header}>
      <div className={styles.logoContent}>
        <img
          src="/icon.png"
          alt="minerva-icon"
          className={styles.logoImg}
        />
        <span className={styles.logoName}>Minerva</span>
      </div>
      {isAuthenticated ? (
        <nav>
          <ul className={styles.navegation}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? clsx(styles.linkActive, styles.link) : styles.link
                }
              >
                <Home className={styles.icon} />
                <span className={styles.name}>Início</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? clsx(styles.linkActive, styles.link) : styles.link
                }
              >
                <Globe className={styles.icon} />
                <span className={styles.name}>Descobrir</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collections"
                className={({ isActive }) =>
                  isActive ? clsx(styles.linkActive, styles.link) : styles.link
                }
              >
                <SquareLibrary className={styles.icon} />
                <span className={styles.name}>Minhas Coleções</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? clsx(styles.linkActive, styles.link) : styles.link
                }
              >
                <Bolt className={styles.icon} />
                <span className={styles.name}>Configurações</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create-collection"
                className={styles.createCollection}
              >
                <SquarePlus className={styles.icon} />
                <span className={styles.name}>Criar Coleção</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <Button
          value="Entrar"
          variant="primary"
          onClick={() => navigate("/login")}
        />
      )}
    </header>
  );
};
