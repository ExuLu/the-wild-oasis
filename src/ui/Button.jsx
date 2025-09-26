import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.4rem 0.8rem;
    text-align: center;
    text-transform: uppercase;
  `,
  medium: css`
    font-size: 1.4rem;
    font-weight: 500;
    padding: 1.2rem 1.6rem;
  `,
  large: css`
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
  `,
};

const variations = {
  primary: css`
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    color: var(--color-grey-600);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    background-color: var(--color-red-700);
    color: var(--color-red-100);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  size: 'medium',
  variation: 'primary',
};

export default Button;
