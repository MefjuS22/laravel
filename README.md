# Sklep internetowy – Laravel + React (Inertia)

Aplikacja do zarządzania katalogiem sklepu (kategorie, produkty, dostawcy, powiązania).

## Technologie

- Laravel 13, MySQL (XAMPP)
- React + TypeScript + Inertia.js + Vite
- Laravel Breeze (logowanie)

## Szybki start (XAMPP)

Szczegóły: [INSTALACJA-XAMPP.md](INSTALACJA-XAMPP.md)

```bash
# Po utworzeniu bazy `sklep` w phpMyAdmin:
php artisan migrate --seed
npm run build
```

Adres: http://localhost/sklep-laravel/public

Login: `admin@sklep.pl` / `haslo123`

## Funkcje

- CRUD dla kategorii, produktów, dostawców i powiązań produkt–dostawca
- Dezaktywacja zamiast usuwania (`is_active`)
- Wyszukiwanie i filtrowanie produktów
- Walidacja Form Request (m.in. cena ≥ 0)
