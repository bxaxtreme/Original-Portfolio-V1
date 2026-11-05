import { useEffect, useState } from 'react';
import { PROFILE } from '../data/social';

export const GITHUB_USERNAME = PROFILE.github.username;

const CACHE_KEY = `gh-stats-${GITHUB_USERNAME}`;
const CACHE_MS = 30 * 60 * 1000; // 30 min, keeps us far from the API rate limit
const API = 'https://api.github.com';

const EMPTY = {
  isLive: false,
  repositories: 0,
  followers: 0,
  stars: 0,
  topLanguages: [],
};

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

async function fetchLiveStats() {
  const [user, repos] = await Promise.all([
    getJson(`${API}/users/${GITHUB_USERNAME}`),
    getJson(`${API}/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&sort=pushed`),
  ]);

  const own = repos.filter((r) => !r.fork);
  const stars = own.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

  // Real language usage: bytes of code per language across all own public repos.
  const results = await Promise.allSettled(
    own.slice(0, 30).map((r) => getJson(r.languages_url))
  );
  const bytes = {};
  results.forEach((r) => {
    if (r.status !== 'fulfilled') return;
    Object.entries(r.value).forEach(([lang, n]) => {
      bytes[lang] = (bytes[lang] || 0) + n;
    });
  });

  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 5).map(([name, n]) => ({
    name,
    percent: total ? Math.round((n / total) * 1000) / 10 : 0,
  }));
  const rest = sorted.slice(5).reduce((sum, [, n]) => sum + n, 0);
  if (rest > 0) top.push({ name: 'Other', percent: Math.round((rest / total) * 1000) / 10 });

  return {
    isLive: true,
    repositories: user.public_repos,
    followers: user.followers,
    stars,
    topLanguages: top,
  };
}

/** Returns { data, loading, error } with real data from the GitHub API. */
export function useGithubStats() {
  const [state, setState] = useState({ data: EMPTY, loading: true, error: false });

  useEffect(() => {
    let cancelled = false;

    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.t < CACHE_MS) {
        setState({ data: cached.data, loading: false, error: false });
        return;
      }
    } catch {
      /* storage unavailable, just fetch */
    }

    fetchLiveStats()
      .then((data) => {
        if (cancelled) return;
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
        } catch {
          /* ignore */
        }
        setState({ data, loading: false, error: false });
      })
      .catch(() => {
        if (!cancelled) setState({ data: EMPTY, loading: false, error: true });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export { EMPTY as DEMO_STATS };
