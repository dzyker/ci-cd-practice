export const HomePage = () => {
  return (
    <>
      <header className="hero">
        <h1>TypeScript + React Mini Site + CI/CD Actions</h1>
        <p>Простой сайт на React с роутингом, стилями и интерактивностью.</p>
      </header>

      <section className="cards">
        <article className="card">
          <h3>Быстрый старт</h3>
          <p>Запускается одной командой через Vite и собирается в production-бандл.</p>
        </article>
        <article className="card">
          <h3>Чистая структура</h3>
          <p>Страницы разнесены по компонентам, а стили в одном месте.</p>
        </article>
        <article className="card">
          <h3>Готово к развитию</h3>
          <p>Дальше можно добавить API, UI-библиотеку или state manager.</p>
        </article>
      </section>
    </>
  );
};
