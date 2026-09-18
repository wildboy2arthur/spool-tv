export function uniqueVideos(videos = []) {
  const seen = new Set();
  return videos.filter((video) => {
    if (!video?.id || seen.has(video.id)) return false;
    seen.add(video.id);
    return true;
  });
}

export function fisherYates(items, random = Math.random) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export class RandomQueue {
  constructor(random = Math.random) {
    this.random = random;
    this.videos = [];
    this.queue = [];
    this.index = -1;
    this.unavailableIds = new Set();
  }

  setVideos(videos = []) {
    const nextVideos = uniqueVideos(videos);
    const sameVideoSet =
      this.videos.length === nextVideos.length &&
      this.videos.every((video, index) => video.id === nextVideos[index].id);

    this.videos = nextVideos;
    this.unavailableIds = sameVideoSet
      ? new Set([...this.unavailableIds].filter((id) => this.videos.some((video) => video.id === id)))
      : new Set();
    this.queue = [];
    this.index = -1;
  }

  clearUnavailable() {
    this.unavailableIds.clear();
    this.queue = [];
    this.index = -1;
  }

  markUnavailable(videoId) {
    if (!videoId) return;
    this.unavailableIds.add(videoId);

    const removedBeforeOrAtCursor = this.queue
      .slice(0, this.index + 1)
      .filter((video) => video.id === videoId).length;
    this.queue = this.queue.filter((video) => video.id !== videoId);
    this.index = Math.max(-1, this.index - removedBeforeOrAtCursor);
  }

  next(currentVideoId = null) {
    const availableVideos = this.videos.filter((video) => !this.unavailableIds.has(video.id));
    if (!availableVideos.length) return null;

    while (true) {
      if (this.index >= this.queue.length - 1) {
        this.queue = fisherYates(availableVideos, this.random);
        if (availableVideos.length > 1 && this.queue[0]?.id === currentVideoId) {
          [this.queue[0], this.queue[1]] = [this.queue[1], this.queue[0]];
        }
        this.index = -1;
      }

      while (this.index + 1 < this.queue.length) {
        const candidate = this.queue[++this.index];
        if (candidate.id === currentVideoId && availableVideos.length > 1) continue;
        return candidate;
      }

      // Defensive fallback for a queue invalidated while an error event was handled.
      this.queue = [];
      this.index = -1;
    }
  }
}
