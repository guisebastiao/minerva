import styles from "@/components/CollectionCommunity/style.module.css";
import { Album, Check, Share2, Star } from "lucide-react";
import { addNewCollection } from "@/hooks/useCollection";
import type { DeckDTO } from "@/services/types/DeckDTO";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { toast } from "sonner";
import clsx from "clsx";

interface CollectionCommunityProps {
  collection: DeckDTO;
}

export const CollectionCommunity = ({
  collection,
}: CollectionCommunityProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const TIME_CLICKED = 2000;

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

  const share = (deckId: string) => {
    const link = `${window.location.protocol}//${window.location.host}/shared/${deckId}`;

    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link da coleção copiado"))
      .catch(() => toast.error("Erro ao copiar o link da coleção"));
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, TIME_CLICKED);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className={styles.content}>
      <div className={styles.box}>
        <Album className={styles.iconAlbum} />
        <span className={styles.headerTitle}>Coleção</span>
      </div>
      <div className={styles.box}>
        <h1 className={styles.title}>{collection.title}</h1>
        <button
          className={clsx(styles.buttonOptions, isCopied && styles.copied)}
          onClick={() => {
            setIsCopied(true);
            share(collection.id);
          }}
        >
          {isCopied ? (
            <Check className={styles.iconShare} />
          ) : (
            <Share2 className={styles.iconShare} />
          )}
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
