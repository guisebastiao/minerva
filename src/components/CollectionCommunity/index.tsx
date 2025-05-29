import styles from "@/components/CollectionCommunity/style.module.css";
import { addNewCollection } from "@/hooks/useCollection";
import type { DeckDTO } from "@/services/types/DeckDTO";
import { Album, Share2, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface CollectionCommunityProps {
  collection: DeckDTO;
}

export const CollectionCommunity = ({
  collection,
}: CollectionCommunityProps) => {
  const { mutate, isPending } = addNewCollection();

  const roundedStars = Math.ceil(collection.assessment);
  const maxStars = 5;

  const formatted = (createdAt: string) => {
    const date = new Date(createdAt);
    return format(date, "'Criado em' d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const checkCollectionBelongUserAndIsTheCollection = (
    belongsToAuthUser: boolean,
    belongsToCollectionUser: boolean
  ): boolean => {
    return belongsToAuthUser || belongsToCollectionUser;
  };

  const addCollection = (deckId: string) => {
    mutate({ deckId });
  };

  return (
    <div className={styles.content}>
      <div className={styles.box}>
        <Album className={styles.iconAlbum} />
        <span className={styles.headerTitle}>Coleção</span>
      </div>
      <div className={styles.box}>
        <h1 className={styles.title}>{collection.title}</h1>
        <button className={styles.buttonShare}>
          <Share2 className={styles.iconShate} />
        </button>
      </div>
      <div className={styles.box}>
        <p className={styles.paragraph}>{collection.description}</p>
      </div>
      <div className={styles.box}>
        <h4 className={styles.titleSecondary}>Criado por</h4>
        <span className={styles.author}>{collection.user.name}</span>
      </div>
      <div className={styles.box}>
        <h4 className={styles.titleSecondary}>Avaliação Média</h4>
        <div className={styles.stars}>
          {Array.from({ length: maxStars }).map((_, i) =>
            i < roundedStars ? (
              <Star
                key={i}
                className={styles.star}
              />
            ) : (
              <Star
                key={i}
                className={styles.starOff}
              />
            )
          )}
        </div>
      </div>
      <span className={styles.createdAt}>
        {formatted(collection.createdAt)}
      </span>
      <Button
        value="Adicionar para minha coleção"
        disabled={checkCollectionBelongUserAndIsTheCollection(
          collection.belongsToAuthUser,
          collection.belongsToCollectionUser
        )}
        onClick={() => addCollection(collection.id)}
        isPending={isPending}
        variant="primary"
      />
    </div>
  );
};
