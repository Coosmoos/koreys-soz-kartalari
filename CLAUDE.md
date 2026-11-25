# 단어 — Koreyscha so'z kartalari (Claude uchun eslatma)

Bitta sahifali ilova: `index.html` (HTML + CSS + JS bitta faylda), `sw.js` (offline), `manifest.webmanifest`, `icons/`, `seed-20-35.json` (20–35-darslar: grammatika + so'zlar).
GitHub Pages: https://coosmoos.github.io/koreys-soz-kartalari/ — `main` ga push qilinsa ~1 daqiqada yangilanadi.

## Token tejash qoidalari (foydalanuvchi talabi)
- Butun faylni o'qima. Kerakli joyni `grep -n "/\* ===== "` (bo'lim belgilari) yoki funksiya nomi bilan top, faqat o'sha qismni `sed -n` bilan o'qi.
- Faylni qayta yozma — faqat o'zgargan blokni almashtir (python `replace` + `assert count==1`).
- Har o'zgarishdan keyin: `node --check` (sintaksis) va takroriy nom tekshiruvi:
  `grep -oE "^(async )?function [A-Za-z0-9_]+" index.html | awk '{print $NF}' | sort | uniq -d` (bo'sh bo'lishi shart — bir xil nom oldin "Takror" tugmasini buzgan).
- Faqat o'zgargan qism uchun test yurgiz, hammasini emas.
- Javob qisqa, o'zbekcha, kod chatga chiqarilmaydi.
- `sw.js` dagi `CACHE` versiyasini har deployda oshir.

## Xavfsizlik
- Repo ochiq. Hech qachon kalit/token/parol/email qo'shma. Push oldidan:
  `grep -nEi 'GOCSPX|client_secret|AIza[0-9A-Za-z_-]{20,}|ghp_|@gmail' index.html sw.js`
- `GOOGLE_CLIENT_ID` ochiq ma'lumot (maxfiy emas). Gemini kaliti faqat foydalanuvchi brauzerida / Drive appdata'da.
- Commit muallifi: `Coosmoos <Coosmoos@users.noreply.github.com>`.

## Bo'limlar (index.html ichida `/* ===== nom ===== */`)
storage (IndexedDB: cards, grammar, kv) · helpers · images (Openverse/Wikimedia) · Gemini (`gemini()`, `patient()` qayta urinish, model avtomatik tanlash) ·
add flow (so'z: Gemini / ChatGPT natijasini joylash; skan rejimlari) · folders · spaced repetition (`schedule`) · review · practice · library (mavzu papkalari, `sortByTheme`) ·
GRAMMATIKA (`renderGrammar` ro'yxat, `renderGramAdd` qo'shish paneli, `fixCloze`, `gramQuestions`, test) · SONLAR · STATISTIKA va GOOGLE SHEETS · Google Drive sinxronlash (`syncNow`, tombstone'lar) ·
Google hisobi (Gmail ko'rsatish/almashtirish) · PWA · darslik to'plami (`applySeed`, deterministik id: `L20-1`, `w-…`, `t-…`) · tabs & init.

## Ma'lumot modeli
- Karta: `{id, ko, roman, uz, en, pos, note, examples[{ko,roman,uz,en}], img, folder, lesson, due, reps, interval, ease, lapses, mod}`
- Grammatika: `{id, num, title, name_uz, level, meaning, form[], explanation, examples[], mistakes[], compare, quiz[{sentence(___), base, answer, options[4], uz}], qa[], …SRS}`
- Har o'zgarish `persist*/saveFolders/removeCard/removeGram` orqali (mod + sync).
