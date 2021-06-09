import React, { ReactElement } from 'react';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  value: string;
  onAnimationEnd: () => void;
};

const Select = ({
  className,
  onChange,
  onAnimationEnd,
  value,
}: Props): ReactElement => (
  <select
    className={className}
    onChange={onChange}
    onAnimationEnd={onAnimationEnd}
    value={value}
  >
    <option hidden value="">
      category
    </option>
    <option value="Task">Task</option>
    <option value="Random Thought">Random Thought</option>
    <option value="Idea">Idea</option>
  </select>
);

export default Select;
