import styled from 'styled-components';

const FileInput = styled.input.attrs({ type: 'file' })`
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;

  &::file-selector-button {
    background-color: var(--color-brand-600);
    border: none;
    border-radius: var(--border-radius-sm);
    color: var(--color-brand-50);
    cursor: pointer;
    font: inherit;
    font-weight: 500;
    margin-right: 1.2rem;
    padding: 0.8rem 1.2rem;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;
