import dayjs from "dayjs";

export const formatTime = (timeCreated) => {
  const time = dayjs(timeCreated).tz('Europe/Kiev');
  return time.fromNow();
}
