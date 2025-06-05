export const constants = {
  secret: process.env.JWT_SECRET ?? 'secret',
  duration: process.env.JWT_DURATION ?? '1d',
};
