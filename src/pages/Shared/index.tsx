import { CollectionCommunity } from "@/components/CollectionCommunity";
import styles from "@/pages/Shared/style.module.css";
import { findDeckById } from "@/hooks/useDeck";
import { useParams } from "react-router-dom";
import { Loading } from "@/components/Loading";

export const Shared = () => {
  const { deckId } = useParams();

  const { data: response, isLoading } = findDeckById({ deckId: deckId! });

  return (
    <main className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <CollectionCommunity collection={response?.data!} />
      )}
    </main>
  );
};
