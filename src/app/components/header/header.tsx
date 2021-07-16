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
  const isActiveNotes = useAppSelector(state => state.app.isActiveNotes);
  return (
    <header className="header">
      <div className="header__control-btn-wrapper">
        <Button label="Add" className="header__btn-add" onClick={btnAddClick} />
      </div>
      <div className="header__render-btn-wrapper">
        <Button
          label="Notes"
          className={`btn header__btn-control  ${
            isActiveNotes ? 'btn-active' : ''
          }`}
          onClick={btnShowNotesClick}
        />
        <Button
          label="Archive"
          className={`btn header__btn-control  ${
            isActiveNotes ? '' : 'btn-active'
          }`}
          onClick={btnShowArchiveClick}
        />
      </div>
    </header>
  );
};

export default Header;
