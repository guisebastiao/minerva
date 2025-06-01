import styles from "@/pages/Home/style.module.css";
import { Star } from "lucide-react";
import gui_banner from "@/assets/gui.jpg";
import karol_banner from "@/assets/karol.jpeg";
import joao_banner from "@/assets/joao.jpg";
import murilo_banner from "@/assets/murilo.jpg";

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
              O Minerva é uma plataforma intuitiva e minimalista para estudos
              com flashcards. ótima para praticar a repetição espaçada com seus
              flashcards ou públicos. Uma ferramenta que se destaca nos estudos
              online.
            </p>
            <div className={styles.userInfo}>
              <img
                src={gui_banner}
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
              É uma ótima ferramenta para os meus estudos, que me ajuda a fixar conteúdos com os quais sempre tive dificuldade. Além de poder criar meus próprios flashcards, também posso consumir materiais de outros usuários, o que potencializa ainda mais meus estudos.
            </p>
            <div className={styles.userInfo}>
              <img
                src={karol_banner}
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
              Depois que decidi estudar de forma mais produtiva, o Minerva se
              tornou meu maior aliado. Sua praticidade e algoritmo de revisão
              inteligente me ajuda a focar nos estudos e revisar os meus
              conhecimentos no tempo certo.
            </p>
            <div className={styles.userInfo}>
              <img
                src={murilo_banner}
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
              O Minerva surpreende pela sua simplicidade e eficiência. É fácil
              de usar e realmente ajuda a fixar os conteúdos com mais
              facilidade. Recomendo pra quem quer estudar de forma mais
              inteligente.
            </p>
            <div className={styles.userInfo}>
              <img
                src={joao_banner}
                alt="João Manoel"
                className={styles.avatar}
              />
              <div>
                <strong>JOÃO MANOEL</strong>
                <span>CEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
