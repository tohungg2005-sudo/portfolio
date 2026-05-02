# PORTFOLIO — Tô Quốc Hùng · CONTEXT FILE
> Đọc file này trước khi chỉnh sửa bất kỳ thứ gì trong dự án.

---

## 1. THÔNG TIN CHỦ NHÂN

| | |
|---|---|
| **Họ tên** | Tô Quốc Hùng |
| **Năm sinh** | 2005 |
| **Trường** | Đại học Ngoại ngữ Tin học TP.HCM (HUFLIT) |
| **Ngành** | Logistics & Supply Chain (năm 3) |
| **Email** | tohungg2005@gmail.com |
| **Facebook** | fb.com/hung.to05 |
| **Điện thoại** | 0941 428 859 |
| **Không có** | GitHub, LinkedIn |

---

## 2. CẤU TRÚC FILE

```
portfolio/
├── index.html              # Toàn bộ HTML (501 dòng)
├── CONTEXT.md              # File này
├── assets/
│   ├── css/
│   │   └── style.css       # ~1650+ dòng CSS
│   ├── js/
│   │   ├── main.js         # Logic JS (~555 dòng)
│   │   └── translations.js # Bản dịch VI + EN
│   ├── img/
│   │   └── ava.jpg         # Ảnh đại diện
│   └── grok.mp4            # Video hero section
```

---

## 3. TECH STACK (tất cả qua CDN, không cần npm)

| Thư viện | Phiên bản | Mục đích |
|---|---|---|
| GSAP | 3.12.4 | Animation scroll + hero |
| GSAP ScrollTrigger | 3.12.4 | Trigger animation khi scroll |
| Spline Viewer | 1.0.0 | 3D background hero |
| Font Awesome | 6.5.0 | Icons |
| Google Fonts | — | Space Grotesk + Fira Code |

**Không dùng:** React, Vue, npm, build tool — chỉ Vanilla HTML/CSS/JS thuần.

---

## 4. CÁC SECTION (theo thứ tự)

### #hero
- Spline 3D background: `https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode`
- Particle canvas (chuột theo dõi)
- Video `assets/grok.mp4` (absolute center)
- Text bottom-left
- Typed text effect (phraseList trong main.js)

### #about
- Avatar card 3D tilt (320×400px) — `assets/img/ava.jpg`
- 3 floating badges: Coach (đỏ/cam), AI Tools (cyan), Logistics (tím)
- Stats: 3 năm học · 2005 · 100% Nhiệt huyết
- `avatar-glow` đang `display: none`

### #skills
- 3 card:
  - **AI & Công cụ số**: ChatGPT, Gemini, Copilot, Canva
  - **Office & Văn phòng**: Word, Excel, PowerPoint
  - **Kỹ năng mềm**: Phân tích & Lập kế hoạch · Giải quyết vấn đề · Giao tiếp & Đàm phán · Tư duy linh hoạt
- Tech orbit (vòng xoay công cụ) bên dưới

### #workstyle
- 6 card phong cách làm việc
- 1 quote block ký tên

### #projects (thực ra là Activities)
- `id="projects"` nhưng nội dung là hoạt động ngoại khoá
- Dùng lại class `.project-card` / `.projects-grid`
- 3 card:
  - **01** Basketball Coach (2023–2026)
  - **02** Uỷ viên BCH Khoa QTKD · HUFLIT (2023–2024)
  - **03** Phó Chủ nhiệm ESC HUFLIT (2025–2026)

### #contact
- Slogan 3 dòng (italic) + ký tên
- 3 kênh: Email · Facebook · Phone
- Form: tên, email, chủ đề (Basketball/Esports/Hợp tác/Khác), lời nhắn
- Form submit là demo (setTimeout, không gửi thật)

---

## 5. HỆ THỐNG I18N (Song ngữ VI / EN)

### Cách hoạt động
- Toàn bộ bản dịch nằm trong `assets/js/translations.js`
- Object `translations = { vi: {...}, en: {...} }`
- HTML dùng attribute:
  - `data-i18n="key"` → thay `textContent`
  - `data-i18n-html="key"` → thay `innerHTML` (dùng khi có `<br>`, `<strong>`)
  - `data-i18n-placeholder="key"` → thay placeholder của input
- Ngôn ngữ lưu trong `localStorage` key `"lang"`
- Nút toggle: `id="langToggle"` trong navbar
- Hàm apply: `applyTranslations(lang)` trong `main.js`

### Khi thêm text mới
1. Thêm `data-i18n="ten_key"` vào HTML
2. Thêm `ten_key: 'nội dung'` vào **cả vi lẫn en** trong `translations.js`
3. Nếu có HTML bên trong thì dùng `data-i18n-html` thay vì `data-i18n`

---

## 6. CSS QUAN TRỌNG

### CSS Variables (`:root` trong style.css)
```css
--bg-primary:    #080b14      /* nền chính */
--bg-card:       rgba(255,255,255,0.04)
--accent:        #6c63ff      /* màu tím chính */
--accent-2:      #00d4ff      /* xanh cyan */
--accent-3:      #ff6584      /* hồng */
--text-primary:  #f0f0f0
--text-secondary:#9ca3af
--font-main:     'Space Grotesk'
--font-code:     'Fira Code'
```

### Class đặc biệt
- `.section` — padding 8rem 0, mỗi section dùng class này
- `.container` — max-width 1200px, auto margin
- `.highlight` — chữ gradient accent
- `.project-card` — card glassmorphism có hover glow (dùng cho cả Activities)
- `.skill-card` — card kỹ năng
- `.ws-card` — card work style
- `.timeline-item` / `.achieve-card` — **hiện không dùng** (đã thay bằng project-card)

### Responsive breakpoints
- `1024px` — 2 cột grid
- `768px` — 1 cột, hamburger menu, ẩn about-visual
- `480px` — full width buttons

---

## 7. JAVASCRIPT CHÍNH (main.js)

| Section | Mô tả |
|---|---|
| Custom cursor | `#cursor`, `#cursorFollower` — ẩn trên mobile |
| Particle canvas | `#particleCanvas` — vẽ hạt theo chuột |
| Navbar scroll | Thêm class `.scrolled` khi cuộn > 50px |
| Hamburger | Toggle `.open` cho `#navLinks` |
| Spline lazy load | Load Spline sau 2s để tránh chặn render |
| GSAP hero | fadeUp các element `[data-gsap="fadeUp"]` |
| GSAP sections | ScrollTrigger cho skill-card, ws-card, contact... |
| Typed text | `phraseList` array, tự gõ + xoá, đổi theo ngôn ngữ |
| Counter | `.stat-number[data-target]` đếm số khi vào viewport |
| 3D card tilt | `#card3d` — nghiêng theo chuột |
| i18n init | `applyTranslations()` + langToggle listener trong `window.load` |
| Contact form | Demo submit (không gửi thật) |

### phraseList (typed text — đổi theo ngôn ngữ)
```js
// VI
['Sinh viên Logistics', 'Basketball Coach', 'Phó Chủ nhiệm ESC HUFLIT', 'Đam mê công nghệ']
// EN  
['Logistics Student', 'Basketball Coach', 'ESC HUFLIT Vice President', 'Tech Enthusiast']
```
*(Kiểm tra lại trong main.js nếu cần chỉnh)*

---

## 8. NHỮNG GÌ ĐÃ QUYẾT ĐỊNH (KHÔNG ĐỔI)

- Không có GitHub, LinkedIn — chỉ Email, Facebook, Phone
- Section "Projects" giữ `id="projects"` nhưng nội dung là Activities
- `avatar-glow` tắt (`display: none`)
- Form contact là demo, không backend
- Ngôn ngữ mặc định: Tiếng Việt

---

## 9. GỢI Ý BƯỚC TIẾP THEO

- [ ] Deploy lên Netlify (kéo thả thư mục `portfolio/`) hoặc GitHub Pages
- [ ] Thêm ảnh thực tế vào các card Activities (nếu có)
- [ ] Cập nhật phraseList trong main.js nếu muốn đổi typed text
- [ ] Thêm link Facebook/fanpage ESC HUFLIT nếu muốn
