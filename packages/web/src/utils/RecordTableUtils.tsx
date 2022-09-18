import React from 'react';
import { RecordDataDateProps } from '../interface/I_Data';

const dateConvert = (sec: number) => {
  // Convert firebase date to standard Date format
  const date = new Date(sec * 1000);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}\n ${date.getHours()}:${date.getMinutes()}`;
};

export const RecordTableColumns = [
  {
    title: '時間',
    key: 'DATE',
    dataIndex: 'DATE',
    render: (item: RecordDataDateProps) => (
      <>
        {dateConvert(item.seconds)}
      </>
    ),
  },
  {
    title: '收縮壓',
    key: 'SYS',
    dataIndex: 'SYS',
  },
  {
    title: '舒張壓',
    key: 'DIA',
    dataIndex: 'DIA',
  },
  {
    title: '脈搏',
    key: 'PULSE',
    dataIndex: 'PULSE',
  },
];

export const convertStatusToColor = (status: string): string => {
  switch (status) {
    case 'normal':
      return '#fff';
    case 'warning':
      return '#ffd400';
    case 'danger':
      return '#c72028';
    default:
      return '#fff';
  }
};

export default RecordTableColumns;
