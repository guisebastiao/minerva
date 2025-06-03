import { CollectionCommunity } from "@/components/CollectionCommunity";
import styles from "@/pages/Shared/style.module.css";
import { findDeckById } from "@/hooks/useDeck";
import { useParams } from "react-router-dom";
import { Loading } from "@/components/Loading";
import clsx from "clsx";

export const Shared = () => {
  const { deckId } = useParams();

  const { data: response, isLoading } = findDeckById({ deckId: deckId! });

  return (
    <main className={clsx(styles.container, isLoading && styles.loading)}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={(styles.content, !isLoading && styles.visible)}>
          <CollectionCommunity collection={response?.data!} />
        </div>
      )}
    </main>
  );
};
