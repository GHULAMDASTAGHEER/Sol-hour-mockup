export type Track = {
  title: string;
  artist: string;
  duration: string;
};

export type GuestRequest = {
  guest: string;
  title: string;
  artist: string;
  status: "queued" | "playing" | "considered";
  minutesAgo: number;
};

export type Phase = "warm-up" | "peak" | "wind-down";

export const gathering = {
  hostFirstName: "Maya",
  gatheringName: "Slow Burn",
  whisper: "Long conversations, longer playlists.",
  startedAt: "8:14 PM",
  durationLabel: "3 hours",
  guestsPresent: 11,
  phase: "peak" as Phase,
  phaseLabel: "Peak",
  phaseProgress: 0.58,
  nowPlaying: {
    title: "Inside",
    artist: "Aldous Harding",
    duration: "4:21",
    elapsed: "1:47",
  },
  upcoming: [
    { title: "Hejira", artist: "Joni Mitchell", duration: "6:42" },
    { title: "Coyote", artist: "Carla dal Forno", duration: "3:58" },
    { title: "Time After Time", artist: "Eva Cassidy", duration: "4:30" },
  ] satisfies Track[],
  recentRequests: [
    {
      guest: "Lina",
      title: "Move On",
      artist: "Mike",
      status: "queued",
      minutesAgo: 2,
    },
    {
      guest: "Rafael",
      title: "Strange",
      artist: "Celeste",
      status: "playing",
      minutesAgo: 14,
    },
    {
      guest: "Yuki",
      title: "After Hours",
      artist: "The Velvet Underground",
      status: "considered",
      minutesAgo: 26,
    },
  ] satisfies GuestRequest[],
};

export function phaseGradient(phase: Phase) {
  switch (phase) {
    case "warm-up":
      return "from-[#fff1de] via-[#f7d9b4] to-[#e89b4c]";
    case "peak":
      return "from-[#f7d9b4] via-[#e89b4c] to-[#b43a2a]";
    case "wind-down":
      return "from-[#e89b4c] via-[#b43a2a] to-[#6b6890]";
  }
}
