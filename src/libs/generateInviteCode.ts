export const generateInviteCode = (): string => {
  const inviteCode = ('0000000' + Math.floor(Math.random() * 10000000))
    .slice(-7)
    .toString();
  return inviteCode;
};
