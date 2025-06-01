import type { CollectionDTO } from "@/services/types/CollectionDTO";
import { Album, GraduationCap, Heart, Share2, Check } from "lucide-react";
import styles from "@/components/CollectionUser/style.module.css";
import { OptionsCollectionUser } from "../OptionsCollectionUser";
import type { FavoriteSchema } from "@/schemas/FavoriteSchema";
import { CreateAssessment } from "../CreateAssessment";
import { DeleteAssessment } from "../DeleteAssessment";
import { addFavorite } from "@/hooks/useCollection";
import { ptBR } from "date-fns/locale";
import { Button } from "../Button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";

interface CollectionUserProps {
  collection: CollectionDTO;
}

export const CollectionUser = ({ collection }: CollectionUserProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const TIME_CLICKED = 2000;

  const { mutate } = addFavorite();

  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const formatted = (createdAt: string) => {
    const date = new Date(createdAt);
    return format(date, "'Criado em' d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const handleFavorite = (data: FavoriteSchema) => {
    mutate(data);
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
        <h1 className={styles.title}>{collection.deck.title}</h1>
        <div className={styles.options}>
          {collection.favorite ? (
            <button
              className={clsx(styles.buttonOptions, styles.favorite)}
              onClick={() =>
                handleFavorite({ deckId: collection.deck.id, favorite: false })
              }
            >
              <Heart className={styles.iconOptions} />
            </button>
          ) : (
            <button
              className={styles.buttonOptions}
              onClick={() =>
                handleFavorite({ deckId: collection.deck.id, favorite: true })
              }
            >
              <Heart className={styles.iconOptions} />
            </button>
          )}
          {collection.deck.isPublic && (
            <button
              className={clsx(styles.buttonOptions, isCopied && styles.copied)}
              onClick={() => {
                setIsCopied(true);
                share(collection.deck.id);
              }}
            >
              {isCopied ? (
                <Check className={styles.iconOptions} />
              ) : (
                <Share2 className={styles.iconOptions} />
              )}
            </button>
          )}
          <OptionsCollectionUser collection={collection.deck} />
        </div>
      </div>
      <div className={styles.box}>
        <p className={styles.paragraph}>{collection.deck.description}</p>
      </div>
      <div className={styles.box}>
        <h4 className={styles.titleSecondary}>Criado por</h4>
        <span className={styles.author}>{collection.deck.user.name}</span>
      </div>
      <span className={styles.createdAt}>
        {formatted(collection.deck.createdAt)}
      </span>
      {collection.deck.review.isUpToDate ? (
        <div className={clsx(styles.studyInfo, styles.isUpToDate)}>
          <GraduationCap className={styles.studyInfoIcon} />
          <span> Você esta em dia</span>
        </div>
      ) : (
        <div className={styles.studyInfo}>
          <GraduationCap className={styles.studyInfoIcon} />
          <span>
            {" "}
            {collection.deck.review.toStudy} de{" "}
            {collection.deck.review.totalFlashcards} a estudar
          </span>
        </div>
      )}
      <Button
        value="Estudar Agora"
        variant="primary"
        disabled={collection.deck.review.isUpToDate}
      />
      {collection.deck.authUserAssessmentDeck ? (
        <>
          <Button
            value="Excluir avaliação"
            variant="secondary"
            onClick={() => setIsDeleteVisible(!isDeleteVisible)}
          />
          <DeleteAssessment
            isVisible={isDeleteVisible}
            setIsVisible={setIsDeleteVisible}
            deckId={collection.deck.id}
          />
        </>
      ) : (
        <>
          <Button
            value="Avaliar"
            variant="secondary"
            onClick={() => setIsCreateVisible(!isCreateVisible)}
          />
          <CreateAssessment
            isVisible={isCreateVisible}
            setIsVisible={setIsCreateVisible}
            deckId={collection.deck.id}
          />
        </>
      )}
    </div>
  );
};
