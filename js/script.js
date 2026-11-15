/**
 * =========================================
 * サイトデータ設定（ここを編集してコンテンツを更新します）
 * =========================================
 */
const SITE_DATA = {
  links: [
    {
      title: "X (Twitter)",
      url: "https://x.com/tyamidori01",
      icon: "ri-twitter-x-line",
    }//,
    // {
    //   title: "Instagram / イラスト置き場",
    //   url: "https://instagram.com/",
    //   icon: "ri-instagram-line",
    // },
    {
      title: "GitHub",
      url: "https://github.com/Key334",
      icon: "ri-github-fill",
    }//,
    // {
    //   title: "pixiv / ポートフォリオ",
    //   url: "https://www.pixiv.net/",
    //   icon: "ri-palette-line",
    // },
  ],
  blogs: [
    {
      id: 1,
      date: "2026.11.15",
      title: "プロフィールサイトを公開しました！",
      excerpt: "お気に入りのイラストをテーマカラーにして、自分のリンクとブログをまとめたサイトを作りました。",
      content: [
        "新しくプロフィールサイトを作成しました！",
        "背景の青緑色と、キャラクターの淡いピンク、そして太めの黒線をベースにデザインしています。",
        "今後はここにSNSのリンクや、日々の制作メモ・ブログをゆるく更新していく予定です。"
      ]
    },
    {
      id: 2,
      date: "2026.11.09",
      title: "アイコンのイラストを描きました",
      excerpt: "丸っこいフォルムとジト目がポイントのオリジナルキャラクターです。",
      content: [
        "サイトのアイコンにも使っているオリジナルキャラクターを描きました。",
        "線の太さに強弱をつけつつ、全体的にポップでステッカーのような雰囲気になるよう意識しています。"
      ]
    }
  ]
};

/**
 * =========================================
 * 描画・イベント処理（基本は編集不要です）
 * =========================================
 */
document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderLinks();
  renderBlogs();
  setupTabs();
  setupModal();
});

// リンク一覧の生成
function renderLinks() {
  const linksList = document.getElementById("links-list");
  linksList.innerHTML = SITE_DATA.links
    .map(
      (link) => `
      <li class="link-item">
        <a href="${link.url}" target="_blank" rel="noopener noreferrer">
          <span class="link-left">
            <i class="${link.icon}"></i>
            <span>${link.title}</span>
          </span>
          <i class="ri-arrow-right-up-line"></i>
        </a>
      </li>
    `
    )
    .join("");
}

// ブログ一覧の生成
function renderBlogs() {
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = SITE_DATA.blogs
    .map(
      (blog) => `
      <article class="blog-card" data-id="${blog.id}">
        <span class="blog-date">${blog.date}</span>
        <h2 class="blog-title">${blog.title}</h2>
        <p class="blog-excerpt">${blog.excerpt}</p>
      </article>
    `
    )
    .join("");
}

// タブ切り替え機能
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".content-section");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;

      tabButtons.forEach((b) => b.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });
}

// ブログ記事モーダル表示機能
function setupModal() {
  const modal = document.getElementById("blog-modal");
  const closeBtn = document.getElementById("modal-close");
  const blogList = document.getElementById("blog-list");

  blogList.addEventListener("click", (e) => {
    const card = e.target.closest(".blog-card");
    if (!card) return;

    const blogId = Number(card.dataset.id);
    const blog = SITE_DATA.blogs.find((b) => b.id === blogId);
    if (!blog) return;

    document.getElementById("modal-date").textContent = blog.date;
    document.getElementById("modal-title").textContent = blog.title;
    document.getElementById("modal-body").innerHTML = blog.content
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}
