import {observable, action, computed, toJS} from 'mobx';

class Selection {
  constructor(uid) {
    this.isSelectAll = observable(false)
    this.selectedRowKeys = observable([]);
    this.uid = uid;
  }
  // 初始化选择状态


  // 单个修改
  changeSelect = action((rowKey, checked, selectedRowsKeys) => {
    if(checked) {
      if(!this.selectedRowKeys.includes(rowKey)) {
        this.selectedRowKeys.push(rowKey);
      }
    }else if (this.isSelectAll) {
      this.isSelectAll = false;
      let data = selectedRowsKeys.filter(key => key !== rowKey);
      this.selectedRowKeys.replace(data);
    } else {
      let data = toJS(this.selectedRowKeys).filter(key => key !== rowKey);
      this.selectedRowKeys.replace(data);
    }
  })
  // 本页全选
  changeSelectAll = action((rowKeys, checked) => {
    if (!checked) {
      this.isSelectAll = false;
    }
    rowKeys.forEach(key => {
      this.changeSelect(key, checked, this.selectedRowKeys);
    });
  })
  // 跨页全选
  selectAll = action(rowKeys => {
    this.isSelectAll = true;
    this.selectedRowKeys = rowKeys;
  })
  // 取消跨页全选
  cancelSelectAll = action(() => {
    this.isSelectAll = false;
    this.selectedRowKeys = [];
  })
  setManager = manager => {
    this.manager = manager;
  }
  getKeys = () => {
    return toJS(this.selectedRowKeys);
  }
  destroy = action(() => {
    this.selectedRowKeys = [];
  })
}

class SelectionManager {
  constructor() {
    this.selections = observable(observable.map());
  }
  setSelection = action(uid => {
    if (!this.selections.has(uid)) {
      let selection = new Selection(uid);
      selection.setManager(this);
      this.selections.set(uid, selection);
    }
  })
  getSelection = uid => {
    if (this.selections.has(uid)) {
      return this.selections.get(uid);
    }
    this.setSelection(uid);
    return this.selections.get(uid);
  }
  destory = action(uid => {
    this.selections.delete(uid);
  })
}

export default new SelectionManager();
