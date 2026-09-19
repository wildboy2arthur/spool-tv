import test from "node:test";
import assert from "node:assert/strict";

import { RandomQueue, fisherYates, uniqueVideos } from "../static/js/random-queue.mjs";

const videos = (ids) => ids.map((id) => ({ id, title: id }));
const keepOrder = () => 0.999;

test("uniqueVideos removes entries without ids and duplicate ids", () => {
  assert.deepEqual(
    uniqueVideos([
      { id: "a" },
      { id: "a" },
      { title: "missing id" },
      null,
      { id: "b" },
    ]),
    [{ id: "a" }, { id: "b" }],
  );
});

test("fisherYates preserves every item", () => {
  const input = ["a", "b", "c", "d"];
  const shuffled = fisherYates(input, () => 0);

  assert.deepEqual(input, ["a", "b", "c", "d"]);
  assert.deepEqual([...shuffled].sort(), input);
});

test("queue does not repeat the current video until another video is available", () => {
  const queue = new RandomQueue(keepOrder);
  queue.setVideos(videos(["a", "b", "c"]));

  const played = [queue.next(), queue.next("a"), queue.next("b"), queue.next("c")].map(
    (video) => video.id,
  );

  assert.deepEqual(played, ["a", "b", "c", "a"]);
});

test("single-video queue is allowed to repeat", () => {
  const queue = new RandomQueue(keepOrder);
  queue.setVideos(videos(["only"]));

  assert.equal(queue.getAvailableCount(), 1);
  assert.equal(queue.next()?.id, "only");
  assert.equal(queue.next("only")?.id, "only");
});

test("available count excludes videos that failed to play", () => {
  const queue = new RandomQueue(keepOrder);
  queue.setVideos(videos(["a", "b", "c"]));

  queue.markUnavailable("b");

  assert.equal(queue.getAvailableCount(), 2);
  assert.notEqual(queue.next("a")?.id, "a");
});

test("unavailable videos are skipped and removed from the current cycle", () => {
  const queue = new RandomQueue(keepOrder);
  queue.setVideos(videos(["a", "b", "c"]));

  assert.equal(queue.next()?.id, "a");
  queue.markUnavailable("a");
  assert.equal(queue.next("a")?.id, "b");
  assert.equal(queue.next("b")?.id, "c");
  assert.equal(queue.next("c")?.id, "b");
});

test("setVideos resets the queue when the playlist changes", () => {
  const queue = new RandomQueue(keepOrder);
  queue.setVideos(videos(["a", "b"]));
  assert.equal(queue.next()?.id, "a");

  queue.setVideos(videos(["x", "y"]));
  assert.equal(queue.next()?.id, "x");
});
