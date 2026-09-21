

import { RandomQueue } from "./random-queue.mjs";

const DATA_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "/api/channel"
  : "/data/channel.json";

const portfolioData = [
  {
    id: "20260628-1",
    folder: "20260628-1",
    title: "陳文舟 | AiGC 導師 個人介紹",
    tag: "showcase",
    desc: "精美的個人品牌形象網頁。詳細介紹陳文舟導師在 AiGC 領域的專業背景、心路歷程與商業課程體系，展示如何協助學員打破程式壁壘，打造個人專屬品牌。",
    tech: ["HTML5", "CSS3", "Responsive", "Personal Brand"],
    entry: "index.html"
  },
  {
    id: "20260628-2",
    folder: "20260628-2",
    title: "ARA CAFÉ | 極致奢華黑金烘焙沙龍",
    tag: "app",
    desc: "專為高端精品咖啡設計的黑金奢華風格網頁。展現從翠綠精品生豆到曜石黑金熟豆的烘焙對比，並整合 Flatpickr 實現奢華感官體驗的線上預約系統。",
    tech: ["TailwindCSS", "Flatpickr", "Booking System", "UX/UI"],
    entry: "index.html"
  },
  {
    id: "20260628-3",
    folder: "20260628-3",
    title: "AI 指揮官教室助手 (v1)",
    tag: "tool",
    desc: "AI 輔助課堂管理與模擬系統。提供教師精緻的課堂進度控制面板、倒數計時器、任務提示器與 Canvas 動態隨機抽人等功能，以提升課堂互動性。",
    tech: ["HTML5 Canvas", "Vanilla JS", "Classroom Assistant"],
    entry: "index.html"
  },
  {
    id: "20260628-4",
    folder: "20260628-4",
    title: "AI MV 視覺革命 | 音樂錄影帶製作與招商平台",
    tag: "showcase",
    desc: "為生成式 AI 音樂錄影帶打造的商業宣傳與夥伴招募平台。結合尖端視覺美學與高效影像方案，針對音樂人、品牌主與投資人提供客製化影像招商方案。",
    tech: ["HTML5", "CSS3", "Business Page", "Interactive UI"],
    entry: "index.html"
  },
  {
    id: "20260628-5",
    folder: "20260628-5",
    title: "Web 小畫家 (v1)",
    tag: "tool",
    desc: "網頁版實時繪圖板工具。具備簡潔的 UI，支援豐富的畫筆模式（自由繪製、線段、圓形、矩形）、色盤選色、筆觸大小調整、一鍵清空以及匯出儲存畫布功能。",
    tech: ["Canvas API", "Lucide Icons", "Web Paint", "File Export"],
    entry: "index.html"
  },
  {
    id: "20260628-6",
    folder: "20260628-6",
    title: "AI 課堂助手 & 小畫家 (整合版)",
    tag: "app",
    desc: "多功能整合應用專案。將精緻的「AI 指揮官教室助手」與優雅的「Web Paint 小畫家」整合在同一個專案資料夾中，提供雙頁面切換預覽功能。",
    tech: ["Multi-page App", "Canvas", "Lucide Icons", "UI Integration"],
    entry: "index.html",
    pages: [
      { name: "教室助手", path: "index.html" },
      { name: "Web 小畫家", path: "paint.html" }
    ]
  },
  {
    id: "20260628-7",
    folder: "20260628-7",
    title: "AI 指揮官教室助手 (v2)",
    tag: "tool",
    desc: "課堂進度助理工具的優化版本。微調了 Canvas 渲染效果與倒數計時機制的內部邏輯，旨在為課堂教學提供更穩定、更流暢的操作體驗。",
    tech: ["Canvas API", "Vanilla JS", "Classroom Assistant"],
    entry: "index.html"
  },
  {
    id: "20260628-8",
    folder: "20260628-8",
    title: "Lo-Fi 音樂動畫產生器",
    tag: "app",
    desc: "整合網頁音訊與視覺的創意多媒體專案。利用 Tone.js 合成器即時生成療癒放鬆的 Lo-Fi 音軌，並透過 Canvas 將音頻視覺化，呈現流暢的氛圍動畫。",
    tech: ["Tone.js", "Web Audio API", "Canvas Animation", "Creative Coding"],
    entry: "index.html"
  },
  {
    id: "20260628-9",
    folder: "20260628-9",
    title: "PortuBR 葡語學習 🇧🇷",
    tag: "game",
    desc: "專為國高中生設計的巴西葡萄牙語單字與句型學習遊戲。採用趣味闖關與實時反饋機制，降低語言學習門檻，讓日常葡語單字練習變得輕鬆有趣。",
    tech: ["Vanilla JS", "Educational Game", "Vocabulary Practice", "Game UI"],
    entry: "index.html"
  },
  {
    id: "20260628-10",
    folder: "20260628-10",
    title: "LearnENG 英語學習 🇬🇧",
    tag: "game",
    desc: "趣味英語單字與句型關卡式學習遊戲。採用與葡語學習相同的互動式學習框架，旨在幫助國高中生每天在遊戲中熟記常用英語單字和句型。",
    tech: ["Vanilla JS", "Educational Game", "English Learning", "Interactive Quiz"],
    entry: "index.html"
  },
  {
    id: "20260628-11",
    folder: "20260628-11",
    title: "Typing Shooter (打字射擊)",
    tag: "game",
    desc: "打字練習與經典太空射擊遊戲的硬核結合。玩家需要快速且精確地打出畫面上出現的英文字彙，以發射雷射摧毀來襲的隕石與敵機，極具爽快感與挑戰性。",
    tech: ["Canvas Game", "Keyboard Input", "Physics & Collision", "Space Shooter"],
    entry: "typing-shooter.html"
  },
  {
    id: "20260628-12",
    folder: "20260628-12",
    title: "打磚塊 (經典消消樂)",
    tag: "game",
    desc: "使用 Canvas 渲染的經典打磚塊遊戲。實作流暢的物理彈跳碰撞、多層彩虹磚塊消除判定，以及簡單的分數與生命值統計機制，重溫復古街機樂趣。",
    tech: ["Canvas 2D", "Collision Physics", "Brick Breaker", "Arcade Game"],
    entry: "index.html"
  }
];

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const state = {
  channel: null,
  playlist: null,
  videos: [],
  filtered: [],
  activeVideoId: null,
  query: "",
};

const randomQueue = new RandomQueue();

const els = {
  sidebar: document.getElementById("sidebar"),
  randomPlayBtn: document.getElementById("random-play-btn"),
  randomOverlay: document.getElementById("random-player-overlay"),
  randomPlayer: document.getElementById("random-player"),
  randomPlayerClose: document.getElementById("random-player-close"),
  navItems: [...document.querySelectorAll(".nav-item[data-view]")],
  views: {
    home: document.getElementById("view-home"),
    watch: document.getElementById("view-watch"),
    about: document.getElementById("view-about"),
    portfolio: document.getElementById("view-portfolio"),
    play: document.getElementById("view-play"),
  },
  loading: document.getElementById("loading-state"),
  error: document.getElementById("error-state"),
  errorMessage: document.getElementById("error-message"),
  retryBtn: document.getElementById("retry-btn"),
  empty: document.getElementById("empty-state"),
  grid: document.getElementById("video-grid"),
  videoCount: document.getElementById("video-count"),
  syncIndicator: document.getElementById("sync-indicator"),
  searchForm: document.getElementById("search-form"),
  searchInput: document.getElementById("search-input"),
  channelTitle: document.getElementById("channel-title"),
  channelDesc: document.getElementById("channel-desc"),
  channelStats: document.getElementById("channel-stats"),
  channelAvatar: document.getElementById("channel-avatar"),
  channelAvatarSm: document.getElementById("channel-avatar-sm"),
  channelNameSm: document.getElementById("channel-name-sm"),
  channelBanner: document.getElementById("channel-banner"),
  channelChip: document.getElementById("channel-chip"),
  sectionTitle: document.getElementById("section-title"),
  sidebarPlaylist: document.getElementById("sidebar-playlist"),
  emptyPlaylistLink: document.getElementById("empty-playlist-link"),
  aboutPlaylist: document.getElementById("about-playlist"),
  aboutTitle: document.getElementById("about-title"),
  aboutDesc: document.getElementById("about-desc"),
  aboutAvatar: document.getElementById("about-avatar"),
  aboutYoutube: document.getElementById("about-youtube"),
  contactFb: document.getElementById("contact-fb"),
  contactEmail: document.getElementById("contact-email"),
  contactEmailText: document.getElementById("contact-email-text"),
  sidebarContactFb: document.getElementById("sidebar-contact-fb"),
  sidebarContactEmail: document.getElementById("sidebar-contact-email"),
  backBtn: document.getElementById("back-btn"),
  player: document.getElementById("player"),
  playerLoader: document.getElementById("player-loader"),
  watchTitle: document.getElementById("watch-title"),
  watchMeta: document.getElementById("watch-meta"),
  watchDesc: document.getElementById("watch-desc"),
  relatedList: document.getElementById("related-list"),
  portfolioGrid: document.getElementById("portfolio-grid"),
  portfolioCount: document.getElementById("portfolio-count"),
  playBackBtn: document.getElementById("play-back-btn"),
  portfolioPlayer: document.getElementById("portfolio-player"),
  playLoader: document.getElementById("play-loader"),
  playTitle: document.getElementById("play-title"),
  playMeta: document.getElementById("play-meta"),
  playDesc: document.getElementById("play-desc"),
  playPagesContainer: document.getElementById("play-pages-container"),
  portfolioRelatedList: document.getElementById("portfolio-related-list"),
  bottomNavItems: [...document.querySelectorAll(".bottom-nav__item[data-view]")],
  bottomSearchTrigger: document.getElementById("bottom-nav-search-trigger"),
};

function setVisibleView(name) {
  Object.entries(els.views).forEach(([key, node]) => {
    node.classList.toggle("is-visible", key === name);
  });
  els.navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === name);
  });
  els.bottomNavItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === name);
  });
  document.body.classList.remove("sidebar-open");
}

function scrollToWatchView() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  els.views.watch?.scrollIntoView({ block: "start", behavior: "auto" });
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function applyChannel(channel) {
  const title = channel.title || "陳文舟";
  const avatar = channel.avatar || "";
  const banner = channel.banner || "";
  const url = channel.url || "https://www.youtube.com/@drccr";

  document.title = `${title} · Arthur TV`;

  els.channelTitle.textContent = title;
  els.aboutTitle.textContent = title;
  els.channelNameSm.textContent = title;
  els.channelDesc.textContent = channel.description || "歡迎來到我的個人影片頻道。";
  els.aboutDesc.textContent = channel.description || "歡迎來到我的個人影片頻道。";

  const playlistLabel = state.playlist?.title ? `播放清單「${state.playlist.title}」` : "自訂播放清單";
  const stats = [channel.subscriberText, playlistLabel, `${state.videos.length} 部影片`].filter(Boolean).join(" · ");
  els.channelStats.textContent = stats;

  [els.channelAvatar, els.channelAvatarSm, els.aboutAvatar].forEach((img) => {
    if (avatar) {
      img.src = avatar;
      img.alt = `${title} 頭像`;
    }
  });

  if (banner) {
    els.channelBanner.style.backgroundImage = `linear-gradient(180deg, rgba(11,12,15,0.15), rgba(11,12,15,0.88)), url("${banner}")`;
  }

  [els.channelChip, els.aboutYoutube].forEach((node) => {
    node.href = url;
  });
}

function applyContact(contact = {}) {
  const facebook = contact.facebook || "https://www.facebook.com/fadawan168";
  const email = contact.email || "wildboy.arthur@gmail.com";

  [els.contactFb, els.sidebarContactFb].forEach((node) => {
    if (node) node.href = facebook;
  });

  if (els.contactEmail) els.contactEmail.href = `mailto:${email}`;
  if (els.sidebarContactEmail) els.sidebarContactEmail.href = `mailto:${email}`;
  if (els.contactEmailText) els.contactEmailText.textContent = email;
}

function applyPlaylist(playlist) {
  if (!playlist) return;

  const title = playlist.title || "播放清單";
  const url = playlist.url || "https://www.youtube.com/playlist?list=PLcZP6IqoyGMNd69ElCNFOIjNyIFYAzwOi";

  els.sectionTitle.textContent = title;
  els.sidebarPlaylist.textContent = title;

  [els.emptyPlaylistLink, els.aboutPlaylist].forEach((node) => {
    if (node) node.href = url;
  });
}

function renderGrid(videos) {
  els.videoCount.textContent = `顯示 ${videos.length} 部`;

  if (!videos.length) {
    els.grid.classList.add("hidden");
    els.empty.classList.remove("hidden");
    return;
  }

  els.empty.classList.add("hidden");
  els.grid.classList.remove("hidden");
  els.grid.innerHTML = videos
    .map(
      (video) => `
      <article class="video-card" data-video-id="${video.id}" tabindex="0" role="button" aria-label="播放 ${escapeHtml(video.title)}">
        <div class="video-card__thumb">
          <img src="${escapeHtml(video.thumbnail)}" alt="${escapeHtml(video.title)}" loading="lazy" />
        </div>
        <div class="video-card__body">
          <h4 class="video-card__title">${escapeHtml(video.title)}</h4>
          <p class="video-card__meta">${escapeHtml(video.relativeTime || video.publishedLabel || "")}</p>
        </div>
      </article>
    `,
    )
    .join("");
}

function renderRelated(activeId) {
  const items = state.videos.filter((video) => video.id !== activeId);
  els.relatedList.innerHTML = items
    .map(
      (video) => `
      <div class="related-item" data-video-id="${video.id}">
        <img src="${escapeHtml(video.thumbnail)}" alt="" loading="lazy" />
        <div>
          <h4>${escapeHtml(video.title)}</h4>
          <p>${escapeHtml(video.relativeTime || video.publishedLabel || "")}</p>
        </div>
      </div>
    `,
    )
    .join("");
}

const EMBED_DEFAULTS = {
  cc_load_policy: "0",
  rel: "0",
  modestbranding: "1",
  playsinline: "1",
};

function buildEmbedUrl(videoId, extra = {}) {
  const params = new URLSearchParams({ ...EMBED_DEFAULTS, ...extra });
  const playlistId = state.playlist?.id || "PLcZP6IqoyGMNd69ElCNFOIjNyIFYAzwOi";
  if (playlistId) {
    params.set("list", playlistId);
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

const randomPlayback = {
  player: null,
  playerReady: false,
  playerReadyPromise: null,
  playerReadyResolve: null,
  playerStates: { PLAYING: 1, ENDED: 0 },
  stateMonitorId: null,
  active: false,
  generation: 0,
  currentVideoId: null,
  currentVideoStarted: false,
  lastFinishedVideoId: null,
  lastEndedVideoId: null,
  lastEndedAt: 0,
  lastTransitionAt: 0,
  transitionInProgress: false,
};

let youtubeIframeApiPromise = null;

function loadYouTubeIframeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeIframeApiPromise) return youtubeIframeApiPromise;

  youtubeIframeApiPromise = new Promise((resolve, reject) => {
    const failTimer = setTimeout(() => {
      reject(new Error("YouTube IFrame Player API 載入逾時"));
    }, 15000);
    const previousReadyCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReadyCallback === "function") previousReadyCallback();
      if (window.YT?.Player) {
        clearTimeout(failTimer);
        resolve(window.YT);
      } else {
        clearTimeout(failTimer);
        reject(new Error("YouTube IFrame Player API 載入不完整"));
      }
    };

    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      clearTimeout(failTimer);
      reject(new Error("無法載入 YouTube IFrame Player API"));
    };
    document.head.appendChild(script);
  });

  return youtubeIframeApiPromise;
}

function createRandomPlayer() {
  if (randomPlayback.playerReady && randomPlayback.player) {
    return Promise.resolve(randomPlayback.player);
  }

  if (randomPlayback.playerReadyPromise) {
    return randomPlayback.playerReadyPromise;
  }

  randomPlayback.playerReadyPromise = loadYouTubeIframeAPI()
    .then(
      (YTApi) =>
        new Promise((resolve, reject) => {
          randomPlayback.playerStates = {
            ...randomPlayback.playerStates,
            ...(YTApi.PlayerState || {}),
          };
          randomPlayback.playerReadyResolve = resolve;
          try {
            randomPlayback.player = new YTApi.Player(els.randomPlayer, {
              playerVars: {
                autoplay: 0,
                controls: 1,
                fs: 1,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                origin: window.location.origin,
              },
              events: {
                onReady: (event) => {
                  randomPlayback.playerReady = true;
                  randomPlayback.playerReadyResolve?.(event.target);
                  randomPlayback.playerReadyResolve = null;
                },
                onStateChange: handleRandomPlayerStateChange,
                onError: handleRandomPlayerError,
                onAutoplayBlocked: () => {
                  console.warn("YouTube blocked autoplay for the random player.");
                },
              },
            });
          } catch (error) {
            randomPlayback.playerReadyResolve = null;
            reject(error);
          }
        }),
    )
    .catch((error) => {
      randomPlayback.playerReadyPromise = null;
      throw error;
    });

  return randomPlayback.playerReadyPromise;
}

function enterRandomFullscreen() {
  const container = els.randomOverlay;
  if (document.fullscreenElement) return Promise.resolve();

  const fullscreenTarget = document.documentElement?.requestFullscreen
    ? document.documentElement
    : container;
  try {
    if (fullscreenTarget.requestFullscreen) {
      return Promise.resolve(
        fullscreenTarget.requestFullscreen({ navigationUI: "hide" }),
      ).catch(() => {
        if (fullscreenTarget === container || !container.requestFullscreen) return;
        return Promise.resolve(container.requestFullscreen()).catch(() => {});
      });
    }
    if (container.webkitRequestFullscreen) {
      return Promise.resolve(container.webkitRequestFullscreen()).catch(() => {});
    }
  } catch {
    // 瀏覽器可能阻擋全螢幕，仍可在覆蓋層播放
  }
  return Promise.resolve();
}

function loadRandomVideo(video) {
  if (!video || !randomPlayback.player || !randomPlayback.active) return false;

  const availableCount = randomQueue.getAvailableCount();
  if (
    availableCount > 1 &&
    randomPlayback.lastFinishedVideoId &&
    video.id === randomPlayback.lastFinishedVideoId
  ) {
    console.warn(
      "Random player rejected a candidate that matches the last finished video: " +
        video.id,
    );
    return false;
  }

  randomPlayback.currentVideoId = video.id;
  randomPlayback.currentVideoStarted = false;
  randomPlayback.lastTransitionAt = Date.now();
  try {
    // Cue the exact candidate first, then start it. This avoids retaining a
    // stale YouTube playlist item when the previous video has just ended.
    if (
      typeof randomPlayback.player.cueVideoById === "function" &&
      typeof randomPlayback.player.playVideo === "function"
    ) {
      randomPlayback.player.cueVideoById({ videoId: video.id, startSeconds: 0 });
      randomPlayback.player.playVideo();
    } else {
      randomPlayback.player.loadVideoById({ videoId: video.id, startSeconds: 0 });
    }
    return true;
  } catch (error) {
    console.warn("無法載入隨機影片 " + video.id + "：" + error.message);
    randomQueue.markUnavailable(video.id);
    return false;
  }
}

function stopRandomPlayback(message = "") {
  if (message) console.warn(message);
  closeRandomPlayer();
  if (message) window.alert(message);
}

function handleRandomVideoEnded() {
  if (!randomPlayback.active) return;
  if (!randomPlayback.currentVideoId || !randomPlayback.currentVideoStarted) {
    return;
  }

  const now = Date.now();
  if (
    randomPlayback.lastTransitionAt &&
    now - randomPlayback.lastTransitionAt < 1500
  ) {
    // A YouTube ENDED event from the previous item can arrive just after the
    // next item has been cued. Do not consume another queue item in that gap.
    return;
  }

  if (
    randomPlayback.lastEndedVideoId === randomPlayback.currentVideoId &&
    now - randomPlayback.lastEndedAt < 1500
  ) {
    return;
  }

  randomPlayback.lastEndedVideoId = randomPlayback.currentVideoId;
  randomPlayback.lastEndedAt = now;
  randomPlayback.lastFinishedVideoId = randomPlayback.currentVideoId;
  randomPlayback.currentVideoStarted = false;
  playNextRandomVideo();
}

function stopRandomPlayerMonitor() {
  if (randomPlayback.stateMonitorId !== null) {
    window.clearInterval(randomPlayback.stateMonitorId);
    randomPlayback.stateMonitorId = null;
  }
}

function startRandomPlayerMonitor() {
  stopRandomPlayerMonitor();
  randomPlayback.stateMonitorId = window.setInterval(() => {
    if (!randomPlayback.active || !randomPlayback.player) return;

    let playerState = null;
    try {
      playerState = randomPlayback.player.getPlayerState?.();
    } catch {
      return;
    }

    if (playerState === randomPlayback.playerStates.PLAYING) {
      randomPlayback.currentVideoStarted = true;
    } else if (playerState === randomPlayback.playerStates.ENDED) {
      handleRandomVideoEnded();
    }
  }, 500);
}

function getNextRandomVideo() {
  const availableCount = randomQueue.getAvailableCount();
  if (!availableCount) return null;

  const lastFinishedVideoId = randomPlayback.lastFinishedVideoId;
  const videoToAvoid = lastFinishedVideoId || randomPlayback.currentVideoId;
  const maxAttempts = Math.max(availableCount * 2, 4);

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = randomQueue.next(videoToAvoid);
    if (!candidate) return null;

    // A finished video is never allowed to be selected again while another
    // playable video exists. Keep asking the queue if a stale queue state
    // happens to return the same id.
    if (availableCount <= 1 || candidate.id !== lastFinishedVideoId) {
      return candidate;
    }
  }

  console.warn(
    "Random queue could not find a different video after " +
      maxAttempts +
      " attempts.",
  );
  return null;
}

function playNextRandomVideo() {
  if (!randomPlayback.active || !randomPlayback.player || randomPlayback.transitionInProgress) return;

  randomPlayback.transitionInProgress = true;
  const nextVideo = getNextRandomVideo();
  if (!nextVideo) {
    randomPlayback.transitionInProgress = false;
    stopRandomPlayback("播放清單中沒有可播放的影片，已停止隨機播放。");
    return;
  }

  const loaded = loadRandomVideo(nextVideo);
  randomPlayback.transitionInProgress = false;
  if (!loaded) playNextRandomVideo();
}

function handleRandomPlayerStateChange(event) {
  if (!randomPlayback.active) return;

  if (event.data === randomPlayback.playerStates.PLAYING) {
    randomPlayback.currentVideoStarted = true;
    return;
  }

  if (event.data === randomPlayback.playerStates.ENDED) {
    handleRandomVideoEnded();
  }
}

function handleRandomPlayerError(event) {
  if (!randomPlayback.active) return;

  const reportedVideoId = event.target.getVideoData?.().video_id || null;
  const videoId = randomPlayback.currentVideoId || reportedVideoId;
  if (videoId) randomQueue.markUnavailable(videoId);
  console.warn(
    "YouTube random player error" +
      (event.data ? " (" + event.data + ")" : "") +
      " for " +
      (reportedVideoId || videoId || "unknown video"),
  );
  playNextRandomVideo();
}

let wakeLockSentinel = null;

async function requestWakeLock() {
  if (!("wakeLock" in navigator)) return;
  try {
    if (wakeLockSentinel !== null) {
      await wakeLockSentinel.release();
    }
    wakeLockSentinel = await navigator.wakeLock.request("screen");
    console.log("Screen Wake Lock is active.");
  } catch (err) {
    console.warn(`Failed to request Wake Lock: ${err.message}`);
  }
}

function releaseWakeLock() {
  if (wakeLockSentinel !== null) {
    wakeLockSentinel.release().then(() => {
      wakeLockSentinel = null;
      console.log("Screen Wake Lock has been released.");
    });
  }
}

function closeRandomPlayer() {
  randomPlayback.active = false;
  randomPlayback.generation += 1;
  stopRandomPlayerMonitor();
  randomPlayback.transitionInProgress = false;
  randomPlayback.currentVideoId = null;
  randomPlayback.currentVideoStarted = false;
  randomPlayback.lastFinishedVideoId = null;
  randomPlayback.lastEndedVideoId = null;
  randomPlayback.lastEndedAt = 0;
  randomPlayback.lastTransitionAt = 0;

  if (randomPlayback.player?.stopVideo) {
    try {
      randomPlayback.player.stopVideo();
    } catch {
      // Player may still be initializing.
    }
  } else {
    els.randomPlayer.src = "";
  }

  els.randomOverlay.classList.add("hidden");
  document.body.classList.remove("random-playing");

  releaseWakeLock();

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

async function startRandomFullscreen() {
  if (!state.videos.length) {
    window.alert("尚無影片可播放，請先等待播放清單載入完成。");
    return;
  }

  randomPlayback.active = true;
  randomPlayback.generation += 1;
  randomPlayback.currentVideoId = null;
  randomPlayback.lastFinishedVideoId = null;
  randomPlayback.lastTransitionAt = 0;
  randomPlayback.transitionInProgress = false;
  randomQueue.setVideos(state.videos);
  randomQueue.clearUnavailable();

  els.randomOverlay.classList.remove("hidden");
  document.body.classList.add("random-playing");

  const generation = randomPlayback.generation;
  const firstVideo = randomQueue.next();
  const fullscreenPromise = enterRandomFullscreen();
  const playerWasReady = randomPlayback.playerReady && randomPlayback.player;
  try {
    if (playerWasReady && firstVideo && loadRandomVideo(firstVideo)) {
      startRandomPlayerMonitor();
    }

    await requestWakeLock();
    await createRandomPlayer();
    if (!randomPlayback.active || generation !== randomPlayback.generation) return;

    if (!playerWasReady) {
      startRandomPlayerMonitor();
      if (!firstVideo || !loadRandomVideo(firstVideo)) {
        playNextRandomVideo();
      }
    } else if (!firstVideo) {
      playNextRandomVideo();
    }
  } catch (error) {
    if (randomPlayback.active && generation === randomPlayback.generation) {
      stopRandomPlayback("隨機播放器載入失敗：" + error.message);
    }
  }
  await fullscreenPromise;
}

function openVideo(videoId, { updateHistory = false } = {}) {
  const video = state.videos.find((item) => item.id === videoId);
  if (!video) return;

  const embedUrl = buildEmbedUrl(videoId, { autoplay: "1" });
  const alreadyPlaying =
    state.activeVideoId === videoId &&
    els.views.watch.classList.contains("is-visible") &&
    els.player.src.includes(videoId);

  state.activeVideoId = videoId;

  if (!alreadyPlaying) {
    els.playerLoader.classList.remove("hidden");
    els.player.src = embedUrl;
  } else {
    els.playerLoader.classList.add("hidden");
  }

  els.watchTitle.textContent = video.title;
  els.watchMeta.textContent = [video.relativeTime, video.publishedLabel].filter(Boolean).join(" · ");
  els.watchDesc.textContent = video.description || "";
  renderRelated(videoId);
  setVisibleView("watch");
  scrollToWatchView();

  if (updateHistory) {
    const hash = `#/watch/${videoId}`;
    if (window.location.hash !== hash) {
      history.pushState({ view: "watch", videoId }, "", hash);
    }
  }
}

function navigateToWatch(videoId) {
  openVideo(videoId, { updateHistory: true });
}

function navigateToView(view) {
  let hash = "#/";
  if (view === "about") hash = "#/about";
  else if (view === "portfolio") hash = "#/portfolio";

  if (window.location.hash !== hash) {
    history.pushState({ view }, "", hash);
  }
  handleRoute();
}

function applyFilter() {
  const query = state.query.trim().toLowerCase();
  state.filtered = !query
    ? [...state.videos]
    : state.videos.filter((video) => {
        const haystack = `${video.title} ${video.description}`.toLowerCase();
        return haystack.includes(query);
      });
  renderGrid(state.filtered);
}

async function loadChannel(forceRefresh = false) {
  const isSilent = state.videos.length > 0;

  if (!isSilent) {
    els.loading.classList.remove("hidden");
    els.grid.classList.add("hidden");
  }
  els.error.classList.add("hidden");
  els.empty.classList.add("hidden");

  try {
    const endpoint = forceRefresh ? `${DATA_URL}?t=${Date.now()}` : DATA_URL;
    let response = await fetch(endpoint, {
      cache: forceRefresh ? "no-store" : "default",
    });
    if (!response.ok && DATA_URL !== "/data/channel.json") {
      response = await fetch(
        "/data/channel.json" + (forceRefresh ? "?t=" + Date.now() : ""),
        { cache: forceRefresh ? "no-store" : "default" },
      );
    }
    if (!response.ok) {
      throw new Error("無法載入播放清單資料");
    }
    const payload = await response.json();
    state.channel = payload.channel;
    state.playlist = payload.playlist;
    state.videos = payload.videos || [];
    state.filtered = [...state.videos];
    randomQueue.setVideos(state.videos);
    applyPlaylist(state.playlist);
    applyChannel(state.channel);
    applyContact(payload.contact);
    applyFilter();

    // 處理背景更新標記與輪詢
    if (payload.updating) {
      els.syncIndicator.classList.remove("hidden");
      setTimeout(() => {
        loadChannel(false);
      }, 5000);
    } else {
      els.syncIndicator.classList.add("hidden");
    }
  } catch (error) {
    if (!isSilent) {
      els.errorMessage.textContent = error.message || "無法載入影片";
      els.error.classList.remove("hidden");
    }
  } finally {
    if (!isSilent) {
      els.loading.classList.add("hidden");
    }
  }
}

function handleRoute() {
  const hash = window.location.hash || "#/";
  
  const watchMatch = hash.match(/^#\/watch\/([A-Za-z0-9_-]{11})$/);
  if (watchMatch) {
    openVideo(watchMatch[1]);
    return;
  }

  const playMatch = hash.match(/^#\/play\/(20260628-\d+)$/);
  if (playMatch) {
    openPortfolio(playMatch[1]);
    return;
  }

  if (hash === "#/about") {
    els.player.src = "";
    els.portfolioPlayer.src = "";
    state.activeVideoId = null;
    setVisibleView("about");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }

  if (hash === "#/portfolio") {
    els.player.src = "";
    els.portfolioPlayer.src = "";
    state.activeVideoId = null;
    setVisibleView("portfolio");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }

  els.player.src = "";
  els.portfolioPlayer.src = "";
  state.activeVideoId = null;
  setVisibleView("home");
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

els.navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navigateToView(item.dataset.view);
  });
});

els.bottomNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    navigateToView(item.dataset.view);
  });
});

els.bottomSearchTrigger.addEventListener("click", () => {
  navigateToView("home");
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    els.searchInput.focus();
  }, 300);
});

els.randomPlayBtn.addEventListener("click", startRandomFullscreen);
els.randomPlayerClose.addEventListener("click", closeRandomPlayer);

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && !els.randomOverlay.classList.contains("hidden")) {
    closeRandomPlayer();
  }
});

els.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = els.searchInput.value;
  applyFilter();
});

els.searchInput.addEventListener("input", () => {
  state.query = els.searchInput.value;
  applyFilter();
});

els.retryBtn.addEventListener("click", () => {
  loadChannel(true);
});
els.backBtn.addEventListener("click", () => {
  navigateToView("home");
});

function handleVideoActivate(event) {
  const target = event.target.closest("[data-video-id]");
  if (!target) return;
  event.preventDefault();
  navigateToWatch(target.dataset.videoId);
}

document.addEventListener("click", handleVideoActivate);

document.addEventListener(
  "keydown",
  (event) => {
    const target = event.target.closest("[data-video-id]");
    if (!target || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    navigateToWatch(target.dataset.videoId);
  },
  true,
);

window.addEventListener("popstate", handleRoute);
window.addEventListener("hashchange", handleRoute);

// 監聽播放器 iframe 載入完成事件，隱藏 loading 遮罩
els.player.addEventListener("load", () => {
  els.playerLoader.classList.add("hidden");
});

// 監聽作品集預覽 iframe 載入完成
els.portfolioPlayer.addEventListener("load", () => {
  els.playLoader.classList.add("hidden");
});

// 作品集返回按鈕
els.playBackBtn.addEventListener("click", () => {
  navigateToView("portfolio");
});

// 渲染作品集網格
function renderPortfolioGrid() {
  els.portfolioCount.textContent = `${portfolioData.length} 個`;
  els.portfolioGrid.innerHTML = portfolioData
    .map((proj, idx) => {
      const numStr = String(idx + 1).padStart(2, "0");
      const techBadges = proj.tech.map(t => `<span class="portfolio-card__tag">${t}</span>`).join("");
      const thumbStyle = `background: linear-gradient(135deg, rgba(11, 12, 15, 0.95), rgba(11, 12, 15, 0.45)), radial-gradient(circle at top left, var(--accent) 0%, transparent 60%); display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: var(--accent); font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; text-shadow: 0 0 10px rgba(111, 203, 194, 0.35);`;
      
      return `
        <article class="portfolio-card" data-portfolio-id="${proj.id}" tabindex="0" role="button" aria-label="預覽專案 ${escapeHtml(proj.title)}">
          <div class="portfolio-card__thumb">
            <div style="${thumbStyle}">${numStr}</div>
          </div>
          <div class="portfolio-card__body">
            <h4 class="portfolio-card__title">${escapeHtml(proj.title)}</h4>
            <p class="portfolio-card__desc">${escapeHtml(proj.desc)}</p>
            <div class="portfolio-card__meta">
              <span class="portfolio-card__tag tag-${proj.tag}">${proj.tag}</span>
              ${techBadges}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

// 開啟專案預覽
function openPortfolio(projId, { updateHistory = false, subPage = null } = {}) {
  const proj = portfolioData.find(p => p.id === projId);
  if (!proj) return;

  const targetPage = subPage || proj.entry || "index.html";
  const embedUrl = `./portfolio/${proj.folder}/${targetPage}`;
  
  const alreadyPlaying = 
    els.portfolioPlayer.src.includes(`/portfolio/${proj.folder}/${targetPage}`) &&
    els.views.play.classList.contains("is-visible");

  if (!alreadyPlaying) {
    els.playLoader.classList.remove("hidden");
    els.portfolioPlayer.src = embedUrl;
  } else {
    els.playLoader.classList.add("hidden");
  }

  if (els.playTitle) els.playTitle.textContent = proj.title;
  if (els.playMeta) els.playMeta.textContent = [proj.tag, proj.tech.join(" · ")].filter(Boolean).join(" · ");
  if (els.playDesc) els.playDesc.textContent = proj.desc || "";

  // 分頁切換按鈕渲染
  if (els.playPagesContainer) {
    if (proj.pages && proj.pages.length > 0) {
      els.playPagesContainer.classList.remove("hidden");
      els.playPagesContainer.innerHTML = proj.pages
        .map(pg => {
          const isActive = pg.path === targetPage;
          return `<button class="play-page-btn ${isActive ? 'is-active' : ''}" data-path="${pg.path}" type="button">${escapeHtml(pg.name)}</button>`;
        })
        .join("");
    } else {
      els.playPagesContainer.classList.add("hidden");
      els.playPagesContainer.innerHTML = "";
    }
  }

  renderPortfolioRelated(projId);
  setVisibleView("play");
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  if (updateHistory) {
    const hash = `#/play/${projId}`;
    if (window.location.hash !== hash) {
      history.pushState({ view: "play", projId }, "", hash);
    }
  }
}

// 渲染更多專案推薦清單
function renderPortfolioRelated(activeId) {
  if (!els.portfolioRelatedList) return;
  const items = portfolioData.filter(p => p.id !== activeId);
  const thumbStyle = `width: 80px; height: 45px; background: linear-gradient(135deg, rgba(11, 12, 15, 0.95), rgba(11, 12, 15, 0.45)), radial-gradient(circle at top left, var(--accent) 0%, transparent 60%); display: flex; align-items: center; justify-content: center; color: var(--accent); font-family: var(--font-display); font-size: 1rem; font-weight: 800; border-radius: 6px; flex-shrink: 0;`;
  
  els.portfolioRelatedList.innerHTML = items
    .map(proj => {
      const rawIdx = portfolioData.findIndex(p => p.id === proj.id);
      const numStr = String(rawIdx + 1).padStart(2, "0");
      return `
        <div class="related-item" data-portfolio-id="${proj.id}" tabindex="0" role="button">
          <div style="${thumbStyle}">${numStr}</div>
          <div>
            <h4>${escapeHtml(proj.title)}</h4>
            <p>${escapeHtml(proj.tag)}</p>
          </div>
        </div>
      `;
    })
    .join("");
}

// 點擊專案與切換事件監聽
document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-portfolio-id]");
  if (!target) return;
  event.preventDefault();
  openPortfolio(target.dataset.portfolioId, { updateHistory: true });
});

document.addEventListener("keydown", (event) => {
  const target = event.target.closest("[data-portfolio-id]");
  if (!target || (event.key !== "Enter" && event.key !== " ")) return;
  event.preventDefault();
  openPortfolio(target.dataset.portfolioId, { updateHistory: true });
}, true);

// 點擊分頁切換按鈕
if (els.playPagesContainer) {
  els.playPagesContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".play-page-btn");
    if (!btn) return;
    const activeCard = portfolioData.find(p => p.title === els.playTitle?.textContent);
    if (activeCard) {
      openPortfolio(activeCard.id, { updateHistory: false, subPage: btn.dataset.path });
    }
  });
}



// 監聽 visibilitychange 在回到分頁時重新申請鎖定
document.addEventListener("visibilitychange", async () => {
  if (wakeLockSentinel !== null && document.visibilityState === "visible") {
    await requestWakeLock();
  }
});

// 初始化作品集
renderPortfolioGrid();

loadChannel().then(handleRoute);

// 先建立隨機播放器，讓使用者按下按鈕時能在同一個操作手勢中載入第一支影片。
createRandomPlayer().catch((error) => {
  console.warn("隨機播放器預載入失敗：" + error.message);
});
