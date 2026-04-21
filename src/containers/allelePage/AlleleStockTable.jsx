import React from 'react';
import { DataTable } from '../../components/dataTable';
import useDataTableQuery from '../../hooks/useDataTableQuery';
import ExternalLink from '../../components/ExternalLink.jsx';

const STOCK_API_BASE = import.meta.env.VITE_STOCK_API_BASE ? '/stock-api' : '';

const CENTER_URLS = {
  Bloomington: { order: 'https://bdsc.indiana.edu/Home/Search?presession=true&q=', home: 'https://bdsc.indiana.edu' },
  Kyoto: { order: 'https://kyotofly.kit.jp/cgi-bin/stocks/search_res_det.cgi?DB_NUM=1&STOCK_NO=', home: 'https://kyotofly.kit.jp/cgi-bin/stocks/index.cgi' },
  Vienna: { order: 'http://stockcenter.vdrc.at/control/product/~VIEW_INDEX~0/~VIEW_SIZE~100/~product_id~', home: 'http://stockcenter.vdrc.at/control/main' },
  FlyORF: { order: 'https://www.flyorf.ch/', home: 'https://www.flyorf.ch/' },
  KDRC: { order: 'http://kdrc.kr/', home: 'http://kdrc.kr/' },
  'NIG-Fly': { order: 'https://shigen.nig.ac.jp/fly/nigfly/', home: 'https://shigen.nig.ac.jp/fly/nigfly/' },
  SanDiego: { order: 'https://www.drosophilaspecies.com/', home: 'https://www.drosophilaspecies.com/' },
};

const AlleleStockTable = ({ alleleId }) => {
  const cleanId = alleleId ? alleleId.replace(/^FB:/, '') : '';
  const url = cleanId && STOCK_API_BASE ? `${STOCK_API_BASE}/alleles/${cleanId}/stocks` : null;

  const { data: results, totalRows, ...tableProps } = useDataTableQuery(url);

  if (!STOCK_API_BASE) return null;

  const columns = [
    {
      dataField: 'collection_short_name',
      text: 'Center',
      formatter: (name) => {
        const info = CENTER_URLS[name];
        return info ? <ExternalLink href={info.home}>{name}</ExternalLink> : name || '';
      },
      headerStyle: { width: '120px' },
      filterable: true,
    },
    {
      dataField: 'stock_number',
      text: 'Stock #',
      formatter: (num, row) => {
        const info = CENTER_URLS[row.collection_short_name];
        const orderUrl = info ? info.order + num : null;
        return orderUrl ? <ExternalLink href={orderUrl}>{num}</ExternalLink> : num;
      },
      headerStyle: { width: '80px' },
    },
    {
      dataField: 'FB_genotype',
      text: 'Genotype',
      formatter: (geno) => (
        <span style={{ maxWidth: '500px', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {geno || ''}
        </span>
      ),
      filterable: true,
      filterName: 'genotype',
    },
  ];

  return (
    <DataTable
      {...tableProps}
      columns={columns}
      data={results}
      downloadUrl={url}
      keyField="FBst"
      totalRows={totalRows}
    />
  );
};

export default AlleleStockTable;
