import { CollectionUser } from "@/components/CollectionUser";
import { findAllCollections } from "@/hooks/useCollection";
import styles from "@/pages/Collection/style.module.css";
import { useSearchParams } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

export const Collection = () => {
  const [search, setSearch] = useSearchParams();

  const {
    data: response,
    isLoading,
    isFetching,
    fetchNextPage,
  } = findAllCollections();

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
      <h1 className={styles.title}>Minhas coleções</h1>
      <form className={styles.form}>
        <label
          className={styles.inputContent}
          htmlFor="search"
        >
          <Search className={styles.icon} />
          <input
            className={styles.inputSearch}
            placeholder="Pesquise suas coleções"
            autoComplete="off"
            name="search"
            id="search"
            value={search.get("search") ?? ""}
            onChange={(e) => {
              setSearch((params) => {
                params.set("search", e.target.value);
                return params;
              });
            }}
          />
          {search.get("search") && (
            <button
              type="button"
              className={styles.resetSearch}
              onClick={() => setSearch({})}
            >
              <X />
            </button>
          )}
        </label>
      </form>
      <section className={styles.collectionContent}>
        {isLoading ? (
          <Loading />
        ) : (
          response?.pages.map((page) =>
            page.data?.map((collection) => (
              <CollectionUser
                key={collection.deck.id}
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
