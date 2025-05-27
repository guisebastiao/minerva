import { findAllPublicCollections } from "@/hooks/useCommunity";
import styles from "@/pages/Community/style.module.css";
import { Loading } from "@/components/Loading";
import { useEffect, useRef } from "react";
import { CollectionCommunity } from "@/components/CollectionCommunity";

export const Community = () => {
  const {
    data: response,
    isLoading,
    isFetching,
    fetchNextPage,
  } = findAllPublicCollections();

  const endScrollRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && !isFetching) {
        fetchNextPage();
      }
    });

    if (endScrollRef.current) {
      observer.current.observe(endScrollRef.current);
    }

    return () => {
      if (endScrollRef.current && observer.current) {
        observer.current.unobserve(endScrollRef.current);
      }
    };
  }, [isFetching]);

  return (
    <main className={styles.container}>
      <section className={styles.collectionContent}>
        {isLoading ? (
          <Loading />
        ) : (
          response?.pages.map((page) =>
            page.data?.map((collection) => (
              <CollectionCommunity
                key={collection.id}
                collection={collection}
              />
            ))
          )
        )}
        <div
          ref={endScrollRef}
          className={styles.scrollRef}
        >
          {!isLoading && isFetching && <Loading />}
        </div>
      </section>
    </main>
  );
};
