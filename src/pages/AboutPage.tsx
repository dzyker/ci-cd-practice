export const AboutPage = () => {
  return (
    <>
      <header className="hero">
        <h1>О проекте</h1>
        <p>Минимальный React-проект теперь уже с DevOps фичами!</p>
      </header>

      <section className="panel">
        <p>
          Этот сайт собран на Vite + React + TypeScript. Такая связка дает быстрый
          local dev и простую структуру.
        </p>
        <p>
          Можно использовать как базу для pet-проекта, лендинга или небольшой админки.
        </p>
      </section>
    </>
  );
};
