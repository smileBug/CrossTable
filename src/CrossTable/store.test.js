import store from './store'

describe('test crossTable store', () => {
  it('创建一个selection实例', () => {
    const selection = store.getSelection('smile')
    expect(selection.uid).toBe('smile')
  })

  it('测试获取keys的方法getKeys', () => {
    const selection = store.getSelection('getKeys')
    selection.selectedRowKeys =  ['7', '8', '9']
    expect(selection.getKeys()).toEqual(['7', '8', '9'])
  })

  it('跨页全选方法selectAll', () => {
    const selection = store.getSelection('selectAll')
    selection.selectAll(['7', '8', '9'])
    expect(selection.isSelectAll).toBeTruthy()
    expect(selection.getKeys()).toEqual(['7', '8', '9'])
  })

  it('清除所有选中项方法destroy', () => {
    const selection = store.getSelection('destroy')
    selection.selectAll(['7', '8', '9'])
    selection.destroy()
    expect(selection.getKeys()).toEqual([])
  })

  describe('单个修改方法changeSelect', () => {
    const selection = store.getSelection('changeSelect')
    it('单个选中', () => {
      selection.changeSelect('8', true)
      expect(selection.getKeys()).toEqual(['8'])
      expect(selection.isSelectAll).not.toBeTruthy()
    })
    it('跨页全选条件下，单个取消', () => {
      selection.selectAll(['7', '8', '9'])
      selection.changeSelect('7', false, ['7', '8', '9'])
      expect(selection.getKeys()).toEqual(['8', '9'])
      expect(selection.isSelectAll).not.toBeTruthy()
    })
    it('非跨页全选条件下，单个取消', () => {
      selection.destroy()
      selection.changeSelect('7', true)
      selection.changeSelect('8', true)
      selection.changeSelect('7', false)
      expect(selection.getKeys()).toEqual(['8'])
      expect(selection.isSelectAll).not.toBeTruthy()
    })
  })

  describe('本页全选方法changeSelectAll', () => {
    const selection = store.getSelection('changeSelectAll')
    it('跨页全选后，本页全部取消', () => {
      selection.selectAll(['7', '8', '9'])
      selection.changeSelectAll(['7', '8'], false)
      expect(selection.getKeys()).toEqual([])
      expect(selection.isSelectAll).not.toBeTruthy()
    })
    it('非跨页全选后，本页全部取消', () => {
      selection.destroy()
      selection.changeSelect('7', true)
      selection.changeSelect('8', true)
      selection.changeSelectAll(['7', '8'], false)
      expect(selection.getKeys()).toEqual([])
      expect(selection.isSelectAll).not.toBeTruthy()
    })
  })
})