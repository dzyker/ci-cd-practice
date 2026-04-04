import { FormEvent, useState } from "react";

export const ContactPage = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim() || "друг";
    const userMessage = String(formData.get("message") ?? "").trim();

    if (!userMessage) {
      setMessage("Введите сообщение перед отправкой.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message: userMessage })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setMessage(`Спасибо, ${name}! Сообщение сохранено в БД.`);
      form.reset();
    } catch {
      setMessage("Не удалось отправить сообщение. Проверьте, что backend запущен.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="hero">
        <h1>Контакты</h1>
        <p>Демо-форма с обработкой на клиенте. ТЕСТ ОШИБКИ</p>
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "Отправить"}
          </button>
        </form>
        <p className="form-result" aria-live="polite">
          {message}
        </p>
      </section>
    </>
  );
};
