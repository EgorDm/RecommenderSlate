import { css } from '@emotion/css';
import { css as rcss } from '@emotion/react';

export const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xLarge: 1200,
  xxLarge: 1280,
  tallPhone: '(max-width: 360px) and (min-height: 740px)',
};

export const queries = Object.keys(breakpoints).reduce((acc, label) => {
  const accumulator = acc;
  if (typeof breakpoints[label] === 'string') {
    accumulator[label] = (...args) =>
      rcss`
        @media (${breakpoints[label]}) {
          ${rcss(...args)};
        }
      `;
  } else {
    accumulator[label] = (...args) =>
      rcss`
        @media (max-width: ${breakpoints[label]}px) {
          ${rcss(...args)};
        }
      `;
  }

  return accumulator;
}, {}) as Record<keyof typeof breakpoints, any>
