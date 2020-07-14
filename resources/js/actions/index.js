/* eslint-disable import/prefer-default-export */
export const checkIfMobile = () => {
  const isMobile = window.innerWidth < 768;
  return {
    type: 'SET_IS_MOBILE',
    payload: isMobile,
  };
};
