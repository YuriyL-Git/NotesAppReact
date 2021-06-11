import React, { ReactElement } from 'react';
import './_select.scss';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  value: string;
  onAnimationEnd: () => void;
  options: Array<string>;
};

const Select = ({
  className,
  onChange,
  onAnimationEnd,
  value,
  options,
}: Props): ReactElement => (
  <select
    className={`select-default ${className}`}
    onChange={onChange}
    onAnimationEnd={onAnimationEnd}
    value={value}
    required
  >
    <option value="" disabled>
      category
    </option>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Select;
