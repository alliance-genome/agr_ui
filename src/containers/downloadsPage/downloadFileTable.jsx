import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'reactstrap';

const DownloadFileTable = ({ children }) => (
  <Table size="sm">
    <thead>
      <tr>
        <th>Description</th>
        <th style={{ width: '200px' }}>Download</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
);

DownloadFileTable.propTypes = {
  children: PropTypes.node,
};

export default DownloadFileTable;
