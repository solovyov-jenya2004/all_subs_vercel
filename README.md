# 🌍 all_subs — VPN-подписка для белых списков в РФ (Vercel)

[![Статус деплоя](https://img.shields.io/github/deployments/solovyov-jenya2004/all_subs_vercel/Production?style=flat-square&logo=vercel&label=Статус&color=blue)](https://github.com/solovyov-jenya2004/all_subs_vercel/deployments)
[![Stars](https://img.shields.io/github/stars/solovyov-jenya2004/all_subs_vercel?style=flat-square&color=0e75b6)](https://github.com/solovyov-jenya2004/all_subs_vercel/stargazers)
[![Last commit](https://custom-icon-badges.demolab.com/github/last-commit/solovyov-jenya2004/all_subs_vercel?logo=history&logoColor=white&color=0e75b6&style=flat-square)](https://github.com/solovyov-jenya2004/all_subs_vercel/commits/main)
![Visitors](https://komarev.com/ghpvc/?username=solovyov-jenya2004&repo=all_subs_vercel&label=Просмотры&color=0e75b6&style=flat-square)

> ⚡ Быстрое и стабильное зеркало [основного репозитория all_subs](https://github.com/solovyov-jenya2004/all_subs).  
> API‑эндпоинты при каждом запросе загружают актуальную подписку напрямую с GitHub.

---

## 📦 Что здесь лежит

В отличие от статических файлов, здесь каждый эндпоинт динамически отдаёт самую свежую версию подписки прямо с GitHub.  
Вам доступны три ссылки:

### 1. Полный список (обычный текст)

```
https://solovyov-jenya2004.vercel.app/api/final_sorted
```

### 2. Полный список в Base64

```
https://solovyov-jenya2004.vercel.app/api/final_sorted_base64
```

### 3🎲 Мобильная подписка

Этот эндпоинт каждый раз отдаёт **новый случайный набор** конфигов из общей базы.  
По умолчанию — **100** конфигов.

```
https://solovyov-jenya2004.vercel.app/api/random
```

Хотите другое количество?  
Напишите `?n=`, а затем число — и вы получите ровно столько конфигов, сколько нужно.  
Например:  
> `https://solovyov-jenya2004.vercel.app/random?n=50` → 50 конфигов

> `https://solovyov-jenya2004.vercel.app/random?n=200` → 200 конфигов  

---

## 🧠 Как это устроено

Этот репозиторий содержит три серверные функции Vercel, которые работают поверх одного источника — файла `final_sorted` из основного репозитория.

- **`/api/final_sorted`** – загружает полный список конфигов и отдаёт его как обычный текст.  
- **`/api/final_sorted_base64`** – делает то же самое, но кодирует результат в Base64.  
- **`/api/random`** – загружает полный список, перемешивает его и возвращает случайную выборку. Количество можно задать параметром `?n=`. По умолчанию отдаётся 100 конфигов.

Основной генератор подписок работает в [all_subs](https://github.com/solovyov-jenya2004/all_subs) и запускается каждую минуту.  
Там же вы можете найти полный список источников, FAQ и документацию.

---

## 📜 Лицензия

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://raw.githubusercontent.com/solovyov-jenya2004/all_subs_vercel/refs/heads/main/LICENSE)

Этот проект распространяется под лицензией **Creative Commons Zero v1.0 Universal (CC0)**.

Вы можете свободно копировать, изменять, распространять и использовать конфиги в любых целях, включая коммерческие, без получения разрешения автора и без указания авторства.

Подробнее: [LICENSE](https://raw.githubusercontent.com/solovyov-jenya2004/all_subs_vercel/refs/heads/main/LICENSE)


## 💬 Контакты

Есть вопрос, идея или нашли ошибку?  
Создайте [Issue](https://github.com/solovyov-jenya2004/all_subs_vercel/issues).

---

## ДИСКЛЕЙМЕР

> *Данный репозиторий является независимым зеркалом. Я не являюсь создателем или владельцем публикуемых VPN‑конфигураций. Материал носит ознакомительный характер.*  
> *Вся ответственность за использование конфигураций лежит на конечном пользователе.*  
> *Проект некоммерческий и не рекламирует какие‑либо VPN‑сервисы.*  
> *Используйте информацию и файлы исключительно в законных целях.*  
> *Подробнее об основном проекте: [all_subs](https://github.com/solovyov-jenya2004/all_subs)*

---

## 🔍 Ключевые слова для поиска

vpn, white list, white lists, wl, бл, белый список, белые списки, подписка, sub, subscription, ru, whitelist, whitelists, впн, ру, россия, рф, российская федерация, russia, russian federation, rf, vercel
