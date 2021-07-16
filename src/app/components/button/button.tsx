import React, { ReactElement } from 'react';
import './_button.scss';

type Props = {
  onClick: () => void;
  label: string;
  className: string;
};

const Button = ({ label, className, onClick }: Props): ReactElement => (
  <button className={`btn ${className}`} type="button" onClick={onClick}>
    {label}
  </button>
);

export default Button;
