# Sklep internetowy – Laravel + React (Inertia)

Aplikacja do zarządzania katalogiem sklepu (kategorie, produkty, dostawcy, powiązania).

## Technologie

- Laravel 13, MySQL (XAMPP)
- React + TypeScript + Inertia.js + Vite
- Laravel Breeze (logowanie)
- Warstwa serwisów (`app/Services/`) — separation of concerns

## Instalacja (XAMPP)

1. Utwórz bazę `sklep` w phpMyAdmin (MySQL).
2. Skopiuj `.env.example` → `.env`, ustaw `php artisan key:generate`.
3. W folderze projektu:

```bash
php artisan migrate --seed
npm install
npm run build
```

4. Uruchom Apache i MySQL w XAMPP.
5. Wejdź na: http://localhost/sklep-laravel/public

Alternatywnie: `uruchom.bat` (serwer `php artisan serve` na http://127.0.0.1:8000).

**Login:** `admin@sklep.pl` / `haslo123`

## Wymagania projektu (zaliczenie)

| Wymaganie | Realizacja |
|-----------|------------|
| Laravel | Framework aplikacji |
| Min. 5 tabel + FK | `categories`, `products`, `suppliers`, `product_supplier`, `users` |
| CRUD + dezaktywacja | 4 moduły, `is_active` zamiast DELETE |
| Wyszukiwanie | Produkty: nazwa, opis, filtr kategorii |
| Walidacja | Form Request, m.in. `price min:0` |
| Mechanizmy Laravel+ | Inertia, relacje Eloquent, seedery, paginacja, serwisy, Breeze |

## Funkcje

- CRUD dla kategorii, produktów, dostawców i powiązań produkt–dostawca
- Dezaktywacja zamiast usuwania (`is_active`)
- Wyszukiwanie i filtrowanie produktów
- Walidacja Form Request (m.in. cena ≥ 0)
- Komunikaty flash po operacjach

## Struktura backendu

- **Kontrolery** — HTTP, Inertia, przekierowania
- **Serwisy** — logika biznesowa i zapytania
- **Modele** — relacje Eloquent, trait `HasActiveStatus`
- **Form Request** — walidacja
