import { styled } from '@mui/system';
  
  const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
    800: '#ffffffde'
  };
  

export const Button = styled('button')(
    ({ theme }) => `
    font-family: 'Inter', sans-serif; /* Define a mesma fonte do título */
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[800]};
    padding: 8px 30px;
    border-radius: 8px;
    color: '#373958';
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid ${blue[800]};
  
    &:hover {
      background-color: ${blue[800]};
    }
  
    &:active {
      background-color: ${blue[800]};
      box-shadow: none;
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  
    &.disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
      &:hover {
        background-color: ${blue[500]};
      }
    }
  `,
  );