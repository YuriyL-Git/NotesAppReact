import React, { ReactElement } from 'react';
import './_header.scss';
import Button from '../button/button';
import { useAppSelector } from '../../hooks/hooks';

type Props = {
  btnAddClick: () => void;
  btnShowNotesClick: () => void;
  btnShowArchiveClick: () => void;
};

const Header = ({
  btnAddClick,
  btnShowNotesClick,
  btnShowArchiveClick,
}: Props): ReactElement => {
  const btnShowNotesActive = useAppSelector(
    state => state.app.showNotesActiveClass,
  );
  const btnArchiveActive = useAppSelector(
    state => state.app.showArchiveActiveClass,
  );
  return (
    <header className="header">
      <div className="header__control-btn-wrapper">
        <Button label="Add" className="header__btn-add" onClick={btnAddClick} />
      </div>
      <div className="header__render-btn-wrapper">
        <Button
          label="To Notes"
          className={`btn header__btn-control  ${btnShowNotesActive}`}
          onClick={btnShowNotesClick}
        />
        <Button
          label="To Archive"
          className={`btn header__btn-control  ${btnArchiveActive}`}
          onClick={btnShowArchiveClick}
        />
      </div>
    </header>
  );
};

export default Header;
