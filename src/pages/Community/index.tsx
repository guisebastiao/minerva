import { CollectionCommunity } from "@/components/CollectionCommunity";
import { findAllPublicCollections } from "@/hooks/useCommunity";
import { IconNotSearch } from "@/components/IconNotSearch";
import { FilterSearch } from "@/components/FilterSearch";
import styles from "@/pages/Community/style.module.css";
import { useSearchParams } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

export const Community = () => {
  const [search, setSearch] = useSearchParams();

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
      <h1 className={styles.title}>Descobrir</h1>
      <form className={styles.form}>
        <label
          className={styles.inputContent}
          htmlFor="search"
        >
          <Search className={styles.icon} />
          <input
            className={styles.inputSearch}
            placeholder="Pesquise por coleções da comunidade"
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
        <FilterSearch />
      </form>
      <section className={styles.collectionContent}>
        {isLoading ? (
          <div className={styles.loadingContent}>
            <Loading />
          </div>
        ) : response?.pages[0].data?.length! <= 0 ? (
          <div className={styles.contentNotSearch}>
            <IconNotSearch />
            <p className={styles.notSearchText}>
              Nenhuma coleção foi encontrada
            </p>
          </div>
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
