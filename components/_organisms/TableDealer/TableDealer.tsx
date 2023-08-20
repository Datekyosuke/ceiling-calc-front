import { Table } from '@mantine/core';
import TableRow from '../../_molecules/TableRow/TableRow';
import TableHeading from '../../_atoms/TableHeading/TableHeading';
import { ATableDealerRows, ATableDealerSortDirections } from '../../../store/AtomsTableDealer';
import { useAtom } from 'jotai';
import { setTableDealerSort, sortNumericValues, sortTextValues } from './Logic';
import { ITableDealerHeadingSortable } from '../../../interfaces';
import { Suspense, useEffect } from 'react';

const TableDealer = () => {
  const [loadedRows, setLoadedRows] = useAtom(ATableDealerRows);
  const [sortDirection, setSortDirection] = useAtom(ATableDealerSortDirections);

  const sortColumn = (column: ITableDealerHeadingSortable, columnType: 'text' | 'numeric') => {
    setSortDirection(setTableDealerSort(sortDirection, column));

    switch (columnType) {
      case 'text':
        setLoadedRows(sortTextValues(loadedRows, column, sortDirection[column]));
        return;
      case 'numeric':
        setLoadedRows(sortNumericValues(loadedRows, column, sortDirection[column]));
        return;
      default:
        return;
    }
  };


  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <TableHeading
              onSort={() => sortColumn('lastName', 'text')}
              iconType={'sortText'}
              sortDirection={sortDirection?.lastName || undefined}
            >
              Фамилия Имя
            </TableHeading>
            <TableHeading>Телефон</TableHeading>
            <TableHeading
              iconType={'sortNumber'}
              onSort={() => sortColumn('debts', 'numeric')}
              sortDirection={sortDirection?.debts || undefined}
            >
              Задолженность
            </TableHeading>
          </tr>
        </thead>
        <tbody>
          {loadedRows.map((row) => (
            <TableRow
              debts={row.debts}
              firstName={row.firstName}
              lastName={row.lastName}
              telephone={row.telephone}
              key={row.firstName + row.lastName + row.telephone}
            />
          ))}
        </tbody>
      </Table>
    </Suspense>
  );
};

export default TableDealer;
