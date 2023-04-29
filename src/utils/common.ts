export const durationInMinsString = (durationInSeconds: number) => {
  if (durationInSeconds / 60 < 60) {
    const sec = Math.floor(durationInSeconds % 60);
    return Math.floor(durationInSeconds / 60) + ':' + (sec < 10 ? '0'+sec : sec);
  } else {
    const mins = Math.floor(Math.floor(durationInSeconds % 3600) / 60);
    const sec = Math.floor(Math.floor(durationInSeconds % 3600) % 60);

    return (
      Math.floor(durationInSeconds / 3600) +
      ':' +
      (mins < 10 ? '0'+mins : mins) +
      ':' +
      (sec < 10 ? '0'+sec : sec)
    );
  }
};
