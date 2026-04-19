const showName = (name: string, index: number): string => {
  // very heavy computation
  return `${name} - ${index}`;
};

const isAllowed = (
  age: number,
  isFirst: boolean,
  activityAge: number,
): string => {
  if (isFirst) {
    return 'always allowed';
  } else {
    return age > activityAge ? 'allowed' : 'declined';
  }
};

export const PersonUtils = {
  showName,
  isAllowed,
};
