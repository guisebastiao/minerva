import type { ReviewFlashcardSchema } from "@/schemas/ReviewFlashcardSchema";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { findAllCollectionsToStudy } from "@/hooks/useCollection";
import styles from "@/pages/StudyCollection/style.module.css";
import { Annoyed, Frown, Meh, Smile } from "lucide-react";
import { reviewFlashcard } from "@/hooks/useReview";
import { Loading } from "@/components/Loading";
import { findDeckById } from "@/hooks/useDeck";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";

const StudyCollection = () => {
  const [_, searchParams] = useSearchParams();
  const { deckId } = useParams();

  const [selectedRating, setSelectedRating] = useState<null | number>(null);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewAnswer, setViewAnswer] = useState(false);

  const navigate = useNavigate();

  const { data: response, isLoading } = findAllCollectionsToStudy();
  const { mutate, isPending, isSuccess } = reviewFlashcard();
  const { data: deck, isLoading: deckLoading } = findDeckById({
    deckId: deckId!,
  });
  const collection = deck?.data!;

  useEffect(() => {
    if (!isLoading && !deckLoading && collection?.review?.isUpToDate) {
      toast.success("Você está em dia!");
      navigate("/collections");
    }
  }, [isLoading, deckLoading, collection]);

  const handleReview = (rating: number) => {
    setSelectedRating(rating);

    const data: ReviewFlashcardSchema = {
      rating,
      flashcardId: response?.data?.[currentFlashcard].id!,
    };

    mutate(data);
  };

  const nextReview = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const nextIndex = currentFlashcard + 1;

      const totalOnPage = response?.data?.length ?? 0;
      const currentPage = response?.paging?.currentPage ?? 0;
      const totalPages = response?.paging?.totalPages ?? 1;

      if (nextIndex < totalOnPage) {
        setCurrentFlashcard(nextIndex);
        setViewAnswer(false);
      } else if (currentPage + 1 < totalPages) {
        const nextPage = currentPage + 1;

        searchParams((params) => {
          params.set("offset", String(nextPage));
          return params;
        });

        setCurrentFlashcard(0);
        setViewAnswer(false);
      } else {
        toast.success("Você concluiu os estudos desta coleção!");
        navigate("/collections");
      }

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 100);
  };

  useEffect(() => {
    if (isSuccess && currentFlashcard <= collection.review.toStudy) {
      nextReview();
    }
  }, [isSuccess]);

  return (
    <section className={styles.container}>
      {isLoading || deckLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.header}>
            <h1>{collection.title}</h1>
            <div className={styles.progress}>
              <span className={styles.text}>
                {Math.round(
                  (currentFlashcard / collection.review.toStudy) * 100
                )}
                %
              </span>
              <div className={styles.slider}>
                {Array.from({ length: collection.review.toStudy }).map(
                  (_, index) => (
                    <span
                      className={clsx(
                        styles.tab,
                        index < currentFlashcard && styles.active
                      )}
                      key={index}
                    />
                  )
                )}
              </div>
              <span className={styles.text}>
                {currentFlashcard}
                {"/"}
                {collection.review.toStudy}
              </span>
            </div>
          </div>
          <div
            className={clsx(
              styles.content,
              isAnimating && styles.slideAnimation
            )}
          >
            <div
              className={clsx(
                styles.cardInner,
                viewAnswer && styles.viewAnswer
              )}
            >
              <div
                className={clsx(styles.card, styles.frontface)}
                onClick={() => setViewAnswer(true)}
              >
                <div className={clsx(styles.folded, styles.foldedFrontface)} />
                <h3 className={styles.cardTitle}>
                  Clique na carta para vira-la
                </h3>
                <h2 className={styles.contentQuestion}>
                  {response?.data?.[currentFlashcard]?.question}
                </h2>
              </div>
              <div
                className={clsx(styles.card, styles.backface)}
                onClick={() => setViewAnswer(false)}
              >
                <div className={clsx(styles.folded, styles.foldedBackface)} />
                <h3 className={styles.cardTitle}>
                  Clique na carta para vira-la
                </h3>
                <h5 className={styles.viewQuestion}>
                  {response?.data?.[currentFlashcard]?.question}
                </h5>
                <h2 className={styles.contentAnswer}>
                  {response?.data?.[currentFlashcard]?.answer}
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.rating}>
            <button
              className={styles.buttonRating}
              onClick={() => handleReview(3)}
              disabled={isPending}
            >
              {isPending && selectedRating === 3 ? (
                <Loading />
              ) : (
                <>
                  <Smile />
                  <span>Fácil</span>
                </>
              )}
            </button>
            <button
              className={styles.buttonRating}
              onClick={() => handleReview(2)}
              disabled={isPending}
            >
              {isPending && selectedRating === 2 ? (
                <Loading />
              ) : (
                <>
                  <Meh />
                  <span>Médio</span>
                </>
              )}
            </button>
            <button
              className={styles.buttonRating}
              onClick={() => handleReview(1)}
              disabled={isPending}
            >
              {isPending && selectedRating === 1 ? (
                <Loading />
              ) : (
                <>
                  <Annoyed />
                  <span>Difícil</span>
                </>
              )}
            </button>
            <button
              className={styles.buttonRating}
              onClick={() => handleReview(0)}
              disabled={isPending}
            >
              {isPending && selectedRating === 0 ? (
                <Loading />
              ) : (
                <>
                  <Frown />
                  <span>Não lembro</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default StudyCollection;
