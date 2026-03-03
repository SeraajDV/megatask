export type ActivitySession = {
  id: string;
  title: string;
  startAt: number;
  endAt: number;
  durationSeconds: number;
};

export type ActiveSession = {
  title: string;
  startAt: number;
};
