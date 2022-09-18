import React, { useEffect, useState } from 'react';
import './RecordTable.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { RecordTableColumns } from '../../utils/RecordTableUtils';

import { getLoadingSelector, getRecordSelector } from '../../store/selectors';
import { getData } from '../../store/slice';

const RecordTable = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingSelector);
  const record = useSelector(getRecordSelector);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const pagination: TablePaginationConfig = {
    className: 'px-2',
    position: ['bottomCenter'],
    current: currentPage,
    pageSize,
    total: record.length,
    showSizeChanger: true,
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    onChange: (page: number, size: number) => {
      setCurrentPage(page);
      setPageSize(size);
    },
  };

  useEffect(() => {
    // fetch data
    if (userId) {
      dispatch(getData(userId));
    }
  }, [userId]);

  return (
    <div className="table__wrapper h-full">
      <div className="table__container h-full">
        <Table
          className="h-full relative"
          dataSource={record}
          columns={RecordTableColumns}
          pagination={pagination}
          loading={isLoading}
          scroll={{ y: 'calc(100vh-118px)' }}
          rowClassName={(rec): string => {
            if (rec !== undefined) {
              if (rec.SYS >= 140 || rec.DIA >= 90 || (rec.SUGAR && rec.SUGAR >= 180)) {
                // Danger
                return 'danger-status';
              }
              if (rec.SYS >= 120 || rec.DIA >= 80 || (rec.SUGAR && rec.SUGAR >= 150)) {
                // Warning
                return 'warning-status';
              }
            }
            return '';
          }}
        />
      </div>
    </div>
  );
};

export default RecordTable;
