const dayjs = require('dayjs');

const GET_RETIREMENT_COUNTDOWN = (birthDate) => {
  const today = dayjs();
  const RETIREMENT_AGE = 65;

  const retirementDate = dayjs(birthDate).add(RETIREMENT_AGE, 'year');

  if (today.isAfter(retirementDate) || today.isSame(retirementDate)) {
    return {
      diffDays: 0,
      years: 0,
      months: 0,
      days: 0,
      retirementDate: today.format('YYYY-MM-DD'),
      retirementDateText: 'Already at or past retirement age',
      retirementCountdownText: 'Already at or past retirement age',
    };
  }

  const diffTime = retirementDate.diff(today, 'day');

  const years = Math.floor(diffTime / 365);
  const months = Math.floor((diffTime % 365) / 30);
  const days = diffTime % 30;

  const retirementDateText = `Retirement Date: ${retirementDate.format(
    'MMMM D, YYYY'
  )} (in approximately ${years} years)`;
  const retirementCountdownText = `${days ? `${days} Days, ` : ''}${
    months ? `${months} Months, ` : ''
  }${years ? `${years} Years ` : ''}until retirement age`;

  return {
    diffDays: diffTime,
    years,
    months,
    days,
    retirementDate: retirementDate.format('YYYY-MM-DD'),
    retirementDateText,
    retirementCountdownText,
  };
};

const AGE_CALCULATOR = (birthDate) => {
  if (!birthDate) return null;
  const today = dayjs();
  const birthDayjs = dayjs(birthDate);
  let age = today.year() - birthDayjs.year();
  const monthDiff = today.month() - birthDayjs.month();

  if (monthDiff < 0 || (monthDiff === 0 && today.date() < birthDayjs.date())) {
    age--;
  }

  return age;
};

module.exports = {
  GET_RETIREMENT_COUNTDOWN,
  AGE_CALCULATOR,
};
