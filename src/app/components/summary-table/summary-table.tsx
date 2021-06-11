import React, { ReactElement } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import './_summary-table.scss';

interface SummaryData {
  category: string;
  notesQty: number;
}

const compare = (a: SummaryData, b: SummaryData) => {
  if (a.notesQty > b.notesQty) {
    return -1;
  }
  if (a.notesQty < b.notesQty) {
    return 1;
  }
  return 0;
};

const SummaryTable = (): ReactElement => {
  const notes = useAppSelector(state => state.notes);
  const isActiveNotes = useAppSelector(state => state.app.isActiveNotes);
  const currentNotes = notes.filter(note => note.isActive === isActiveNotes);

  const categories: Set<string> = new Set();
  currentNotes.forEach(note => categories.add(note.category));
  const summaryData: Array<SummaryData> = [];

  categories.forEach(category => {
    const notesQty = currentNotes.filter(
      note => note.category === category,
    ).length;
    summaryData.push({ category, notesQty });
  });

  summaryData.sort(compare);

  return (
    <section className="summary-table">
      {summaryData.map(summaryRow => (
        <div key={summaryRow.category} className="summary-table__row-wrapper">
          <div className="summary-table__category-name">
            {summaryRow.category}
          </div>
          <div className="summary-table__category-notes-qty">
            {summaryRow.notesQty}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SummaryTable;
