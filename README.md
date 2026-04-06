# Учебный проект для практики CI/CD

<img width="340" height="360" alt="image" src="https://github.com/user-attachments/assets/f2fd0e06-43d3-4c59-98fd-2cb2c303fdfc" />

## Frontend + Backend + DB
<img width="275" height="183" alt="image" src="https://github.com/user-attachments/assets/3fd33f5d-49dc-4415-aeba-47d720bec9a2" />

Dockerfile.frontend и Dockerfile.backend обеспечивают сборку образов бека и фронта. Фронт запускается на nginx образе, БД для бека - postgreesql.
compose.yaml позволяет запускать приложение одной командой: docker compose up -d.

<img width="309" height="163" alt="image" src="https://github.com/user-attachments/assets/25b12bc3-5474-475f-a35e-7cad667c1fcf" />

При пуше коммита на удалённый репозиторий запускается CI/CD пайплайн с 3 стадиями: 
--- test ---  Запускается линтинг через eslint и тестировка с помощью jest.

<img width="663" height="746" alt="image" src="https://github.com/user-attachments/assets/64df5f7c-2d6a-4bd9-a413-37e3d644312f" />

--- build-and-push ---  Запускается при успешном выполнении стадии test. Автоматический логин в докерхаб, сборка Бек и Фронт образов и их отправка в докерхаб.

<img width="1134" height="1055" alt="image" src="https://github.com/user-attachments/assets/0b4d51eb-add9-4c97-a01b-8f75a6ff8e76" />

--- deploy ---  Запускается при успешном выполнении стадии build-and-push. Для упрощения запускается на локальной машине (ну да, нету денег, а кому сейчас легко?), подтягивает файлы из ударённого репо в /var/www/myapp и подгружает актуальные образы с докерхаба и перезагружает контейнер с билдом docker compose up -d --build.

<img width="970" height="909" alt="image" src="https://github.com/user-attachments/assets/e4a3df03-8276-407a-b246-e9f08c85ff08" />

<img width="340" height="360" alt="image" src="https://github.com/user-attachments/assets/4bd941b3-ebd6-46b9-8c68-b50e97a84b32" />
