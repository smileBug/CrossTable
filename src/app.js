import React from 'react';
import ReactDOM from 'react-dom';
import CrossTable from '@/CrossTable/';
import 'antd/dist/antd.css';


const data = [];
const ids = [];
for (let i = 0; i < 46; i++) {
  ids.push(i);
  data.push({
    key: i,
    name: `smile${i}`,
    age: 32,
    address: `Center Pack. ${i}`,
  });
}
const columns = [
  {title: 'name', dataIndex: 'name'},
  {title: 'age', dataIndex: 'age'},
  {title: 'address', dataIndex: 'address'}
];
ReactDOM.render(
  <div style={{textAlign: 'center'}}>
    <h1>Smile, Bug!</h1>
    <CrossTable
      columns={columns}
      dataSource={data}
      rowKey={o => o.key}
      crossOption={{
        total: ids.length,
        allIds: ids,
        uid: 'demo'
      }}
    />
  </div>,
  document.getElementById('app')
);