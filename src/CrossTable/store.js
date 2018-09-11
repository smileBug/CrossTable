import {observable, action, toJS} from 'mobx';

class Selection {
  @observable isSelectAll = false;
  @observable selectedRowKeys = [];
  // 初始化选择状态

  constructor(uid) {
    this.uid = uid;
  }

  // 单个修改
  @action changeSelect = (rowKey, checked, selectedRowsKeys) => {
    // 单个选中
    if(checked) {
      if(!this.selectedRowKeys.includes(rowKey)) {
        this.selectedRowKeys.push(rowKey);
      }
    // 跨页全选情况下，取消单个后，全选取消，只剩本页未被取消的项
    }else if (this.isSelectAll) {
      this.isSelectAll = false;
      let data = selectedRowsKeys.filter(key => key !== rowKey);
      this.selectedRowKeys.replace(data);
    // 非跨页全选下，取消单个。
    } else {
      let data = toJS(this.selectedRowKeys).filter(key => key !== rowKey);
      this.selectedRowKeys.replace(data);
    }
  }
  // 本页全选
  @action changeSelectAll = (rowKeys, checked) => {
    if (!checked) {
      this.isSelectAll = false;
      this.selectedRowKeys = [];
    }
    rowKeys.forEach(key => {
      this.changeSelect(key, checked, this.selectedRowKeys);
    });
  }
  // 跨页全选
  @action selectAll = rowKeys => {
    this.isSelectAll = true;
    this.selectedRowKeys = rowKeys;
  }
  // 取消跨页全选
  @action cancelSelectAll = () => {
    this.isSelectAll = false;
    this.selectedRowKeys = [];
  }
  setManager = manager => {
    this.manager = manager;
  }
  getKeys = () => {
    return toJS(this.selectedRowKeys);
  }
  @action
  destroy() {
    this.selectedRowKeys = [];
    this.isSelectAll = false;
  }
}

class SelectionManager {
  @observable selections = observable.map();
  @action setSelection = uid => {
    if (!this.selections.has(uid)) {
      let selection = new Selection(uid);
      selection.setManager(this);
      this.selections.set(uid, selection);
    }
  }
  getSelection = uid => {
    if (this.selections.has(uid)) {
      return this.selections.get(uid);
    }
    this.setSelection(uid);
    return this.selections.get(uid);
  }
  @action destory = uid => {
    this.selections.delete(uid);
  }
}

export default new SelectionManager();
