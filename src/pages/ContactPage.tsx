import { FormEvent, useState } from "react";

export const ContactPage = () => {
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim() || "друг";
    setMessage(`Спасибо, ${name}! Сообщение отправлено (демо-режим).`);
    event.currentTarget.reset();
  };

  return (
    <>
      <header className="hero">
        <h1>Контакты</h1>
        <p>Демо-форма с обработкой на клиенте.</p>
      </header>

      <section className="panel">
        <form className="contact-form" onSubmit={onSubmit}>
          <label>
            Имя
            <input type="text" name="name" placeholder="Введите имя" required />
          </label>
          <label>
            Сообщение
            <textarea
              name="message"
              rows={4}
              placeholder="Введите сообщение"
              required
            />
          </label>
          <button type="submit">Отправить</button>
        </form>
        <p className="form-result" aria-live="polite">
          {message}
        </p>
      </section>
    </>
  );
};
