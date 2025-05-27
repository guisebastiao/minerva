import { useContextAuth } from "@/context/AuthContext";

export const Community = () => {
  const { logout } = useContextAuth();

  return (
    <main>
      <h1>Community</h1>
      <button onClick={() => logout()}>LOGOUT</button>
    </main>
  );
};
