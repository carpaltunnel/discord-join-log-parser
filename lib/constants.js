module.exports = {
  EVENT_TYPES: {
    JOIN: 'join',
    LEAVE: 'leave',
  },
  DYNO_NICK: 'DynoBOT',
  EVENT_START: 'Member',
  MEMBER_JOINED_REGEX: /.*Member Joined.*/,
  MEMBER_LEFT_REGEX: /.*Member Left.*/,

  //TODO : Add regex that includes years and don't ban
  ACCOUNT_AGE_REGEX: /.*weeks,.*days,.*hrs,.*min.*/,
  ACCOUNT_AGE_YEARS_REGEX: /.*years, .*months, .*days.*/,
};