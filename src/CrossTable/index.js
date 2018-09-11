import React, {Component} from 'react';
import {Table as NormalTable} from 'antd';
import {observer} from 'mobx-react';
import selectionManager from './store.js';
import './style.css';

@observer
class Table extends Component {

  constructor(props) {
    super(props);
    this.selection = {};
    if(props.crossOption) {
      this.selection = selectionManager.getSelection(props.crossOption.uid);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.crossOption.allIds) !== JSON.stringify(nextProps.crossOption.allIds)) {
      this.selection.destroy();
    }
  }

  // componentWillUnmount() {
  //   this.selection.destroy();
  // }

  getRowKey = record => {
    let {rowKey} = this.props;
    let key;
    if(typeof rowKey === 'function') {
      key = rowKey(record);
    }else{
      throw new Error('please don`t use index as the key');
    }
    return key;
  }
  handleSelect = (record, selected, selectedRows) => {
    const selectedRowsKeys = selectedRows.map(o => this.getRowKey(o));
    this.selection.changeSelect(this.getRowKey(record), selected, selectedRowsKeys);
  }
  handleSelectAll = (selected, selectedRows, changeRows) => {
    const {dataSource, selectCrossPage} = this.props;
    let rowKeys = changeRows.map(o => this.getRowKey(o));
    this.selection.changeSelectAll(rowKeys, selected);
  }

  renderToolBar = () => {
    const {otherTool, crossOption: {total, allIds = []}} = this.props;
    let selectCount = this.selection.selectedRowKeys.length;
    if (this.selection.isSelectAll) {
      selectCount = total;
    }
    return (
      <div className='crossTable-toolbar'>
        {
          allIds.length !== 0 &&
          <div>
            <span>已勾选{selectCount}项，</span>
            {
              (this.selection.isSelectAll || selectCount === allIds.length) ? 
              <a onClick={this.selection.cancelSelectAll}>取消勾选</a> :
              <a onClick={() => this.selection.selectAll(allIds)}>勾选全部{total}项</a>
            }
          </div>
        }
        <div>
          {otherTool}
        </div>
      </div>
    );
  }
  render() {
    const {title, rowSelection, crossOption, ...other} = this.props;
    let _rowSelection;
    let selectedRowKeys = [];
    if (this.selection.isSelectAll) {
      selectedRowKeys = this.props.dataSource.map(o => this.getRowKey(o));
    } else {
      selectedRowKeys = this.selection.selectedRowKeys;
    }
    if (crossOption) {
      _rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onSelect: this.handleSelect,
        onSelectAll: this.handleSelectAll
      };
    }
    const props = {
      ...other,
      rowSelection: _rowSelection
    };
    return (
      <div>
        {this.renderToolBar()}
        <NormalTable
          {...props}
        />
      </div>
    );
  }
}

export default Table;
