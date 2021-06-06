import React, { ReactElement } from 'react';
import './_header.scss';
import Button from '../button/button';

type Props = {
  btnAddClick: () => void;
  btnShowNotesClick: () => void;
  btnShowArchiveClick: () => void;
};

const Header = ({
  btnAddClick,
  btnShowNotesClick,
  btnShowArchiveClick,
}: Props): ReactElement => (
  <header className="header">
    <div className="header__control-btn-wrapper">
      <Button label="Add" className="header__btn-add" onClick={btnAddClick} />
    </div>
    <div className="header__render-btn-wrapper">
      <Button
        label="To Notes"
        className="header__btn-show-notes btn-active"
        onClick={btnShowNotesClick}
      />
      <Button
        label="To Archive"
        className="btn header__btn-show-archive"
        onClick={btnShowArchiveClick}
      />
    </div>
  </header>
);

export default Header;
