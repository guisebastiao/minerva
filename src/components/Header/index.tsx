import styles from "@/components/Header/style.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContextAuth } from "@/context/AuthContext";
import { Button } from "../Button";
import { useState } from "react";
import clsx from "clsx";
import {
  AlignRight,
  Bolt,
  Globe,
  Home,
  SquareLibrary,
  SquarePlus,
  X,
} from "lucide-react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useContextAuth();

  const links = [
    { to: "/", icon: <Home className={styles.icon} />, label: "Início" },
    {
      to: "/community",
      icon: <Globe className={styles.icon} />,
      label: "Descobrir",
    },
    {
      to: "/collections",
      icon: <SquareLibrary className={styles.icon} />,
      label: "Minhas Coleções",
    },
    {
      to: "/settings",
      icon: <Bolt className={styles.icon} />,
      label: "Configurações",
    },
  ];

  return (
    <header className={styles.header}>
      <div
        className={styles.logoContent}
        onClick={() => navigate("/")}
      >
        <img
          src="/icon.png"
          alt="minerva-icon"
          className={styles.logoImg}
        />
        <span className={styles.logoName}>Minerva</span>
      </div>
      <nav className={clsx(styles.nav, isOpen && styles.isOpen)}>
        <ul className={styles.navegation}>
          {isAuthenticated ? (
            <>
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? clsx(styles.linkActive, styles.link)
                        : styles.link
                    }
                  >
                    {link.icon}
                    <span className={styles.name}>{link.label}</span>
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/create-collection"
                  onClick={() => setIsOpen(false)}
                  className={styles.createCollection}
                >
                  <SquarePlus className={styles.icon} />
                  <span className={styles.name}>Criar Coleção</span>
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <h1 className={styles.title}>Entre com sua conta</h1>
              <p className={styles.description}>
                Entre no Minerva e aprenda de forma prática com flashcards
              </p>
              <Button
                value="Entrar"
                variant="primary"
                onClick={() => navigate("/login")}
                className={styles.buttonLogin}
              />
            </li>
          )}
        </ul>
      </nav>
      <button
        className={styles.btnToggleMenu}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <X className={styles.toggleIcon} />
        ) : (
          <AlignRight className={styles.toggleIcon} />
        )}
      </button>
    </header>
  );
};
