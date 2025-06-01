import styles from "@/pages/Home/style.module.css";
import { Star } from "lucide-react";

export const Home = () => {
  return (
    <main className={styles.container}>
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerTop}>
            <div className={styles.bannerText}>
              <h2>
                DOMINE
                <br />
                COM
                <br />
                REPETIÇÃO
              </h2>
            </div>
            <img
              src="/brain-home.png"
              alt="brain-illustrated"
              className={styles.brainIcon}
            />
          </div>
          <p className={styles.bannerSubtitle}>
            Simples de usar e difícil de esquecer
          </p>
        </div>
      </section>
      <section className={styles.sloganContent}>
        <h2 className={styles.slogon}>SOMOS O QUE REPETIDAMENTE FAZEMOS</h2>
      </section>
      <section className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepLeft}>
            <strong>1.</strong>
            <span>Crie</span>
          </div>
          <p className={styles.stepText}>Monte seus próprios flashcards.</p>
        </div>
        <div className={styles.step}>
          <div className={styles.stepLeft}>
            <strong>2.</strong>
            <span>Otimize</span>
          </div>
          <p className={styles.stepText}>
            Estude de qualquer lugar com praticidade.
          </p>
        </div>
        <div className={styles.step}>
          <div className={styles.stepLeft}>
            <strong>3.</strong>
            <span>Lembre</span>
          </div>
          <p className={styles.stepText}>Fixe o conteúdo com eficiência.</p>
        </div>
      </section>
      <section className={styles.description}>
        <h2>Minerva</h2>
        <p className={styles.descriptionText}>
          Minerva transforma a memorização em um processo natural e eficaz,
          usando repetição espaçada para consolidar o conhecimento no seu ritmo.
        </p>
      </section>
      <section className={styles.reviewsSection}>
        <h2>Avaliações</h2>
        <div className={styles.reviews}>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={styles.starsFill}
                />
              ))}
            </div>
            <p className={styles.reviewText}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <div className={styles.userInfo}>
              <img
                src="/guilherme.png"
                alt="Guilherme"
                className={styles.avatar}
              />
              <div>
                <strong>GUILHERME</strong>
                <span>CEO</span>
              </div>
            </div>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={styles.starsFill}
                />
              ))}
            </div>
            <p className={styles.reviewText}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <div className={styles.userInfo}>
              <img
                src="/karoline.png"
                alt="Karoline"
                className={styles.avatar}
              />
              <div>
                <strong>KAROLINE</strong>
                <span>CEO</span>
              </div>
            </div>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={styles.starsFill}
                />
              ))}
            </div>
            <p className={styles.reviewText}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <div className={styles.userInfo}>
              <img
                src="/murilo.png"
                alt="Murilo Américo"
                className={styles.avatar}
              />
              <div>
                <strong>MURILO AMÉRICO</strong>
                <span>CEO</span>
              </div>
            </div>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={styles.starsFill}
                />
              ))}
            </div>
            <p className={styles.reviewText}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <div className={styles.userInfo}>
              <img
                src="/joao.png"
                alt="João Manuel"
                className={styles.avatar}
              />
              <div>
                <strong>JOÃO MANUEL</strong>
                <span>CEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
