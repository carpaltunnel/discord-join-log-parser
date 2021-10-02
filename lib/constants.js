module.exports = {
  EVENT_TYPES: {
    JOIN: 'join',
    LEAVE: 'leave',
  },
  EVENT_START: 'Member',
  MEMBER_JOINED_REGEX: /.*Member Joined.*/,
  MEMBER_LEFT_REGEX: /.*Member Left.*/,
  ACCOUNT_AGE_REGEX: /.*weeks,.*days,.*hrs,.*min.*/,
  ACCOUNT_AGE_YEARS_REGEX: /.*years, .*months, .*days.*/,
};