import React from 'react'
import { mount, shallow } from 'enzyme'
import CrossTable from './index'

const columns = [{title: 'id', key: 'id', dataIndex: 'id'}]
// 假设两个一页，则该数据为两页
const dataSource = [{id: '1'}, {id: '2'}, {id: '3'}]
describe('<CrossTable />', () => {
  it('测试初始化', () => {
    const wrapper = shallow(
      <CrossTable 
        rowKey={o => o.id}
        columns={columns}
        dataSource={dataSource}
        crossOption={{
          uid: 'smile',
          allIds: ['1', '2', '3'],
          total: 3
        }}
      />
    )
    expect(wrapper.instance().selection.uid).toBe('smile')
    expect(wrapper.find('span').text()).toBe('已勾选0项，')
    expect(wrapper.find('a').text()).toBe('勾选全部3项')

  })
  it('测试单个修改handleSelect', () => {
    const wrapper = mount(
      <CrossTable 
        rowKey={o => o.id}
        columns={columns}
        dataSource={dataSource}
        crossOption={{
          uid: 'handleSelect',
          allIds: ['1', '2', '3'],
          total: 3
        }}
      />
    )
    wrapper.instance().handleSelect({id: '1'}, true, [{id: '1'}])
    expect(wrapper.instance().selection.selectedRowKeys.slice()).toEqual(['1'])
    expect(wrapper.find('span').first().text()).toBe('已勾选1项，')
    expect(wrapper.find('a').first().text()).toBe('勾选全部3项')
    wrapper.update()
    expect(wrapper.find('span.ant-checkbox-checked')).toHaveLength(1)
  })
  it('测试本页全修改handleSelectAll', () => {
    const wrapper = mount(
      <CrossTable 
        rowKey={o => o.id}
        columns={columns}
        dataSource={[{id: '1'}, {id: '2'}]}
        crossOption={{
          uid: 'handleSelectAll',
          allIds: ['1', '2', '3'],
          total: 3
        }}
      />
    )
    wrapper.instance().handleSelectAll(true, [{id: '1'}, {id: '2'}], [{id: '1'}, {id: '2'}])
    expect(wrapper.instance().selection.selectedRowKeys.slice()).toEqual(['1', '2'])
    expect(wrapper.find('span').first().text()).toBe('已勾选2项，')
    expect(wrapper.find('a').first().text()).toBe('勾选全部3项')
    wrapper.update()
    expect(wrapper.find('span.ant-checkbox-checked')).toHaveLength(3)
  })
  it('测试跨页全选', () => {
    const wrapper = mount(
      <CrossTable 
        rowKey={o => o.id}
        columns={columns}
        dataSource={[{id: '1'}, {id: '2'}]}
        crossOption={{
          uid: 'handleSelectAll',
          allIds: ['1', '2', '3'],
          total: 3
        }}
      />
    )
    wrapper.find('a').first().simulate('click')
    expect(wrapper.instance().selection.selectedRowKeys.slice()).toEqual(['1', '2', '3'])
    expect(wrapper.find('span').first().text()).toBe('已勾选3项，')
    expect(wrapper.find('a').first().text()).toBe('取消勾选')
    wrapper.update()
    expect(wrapper.find('span.ant-checkbox-checked')).toHaveLength(3)
  })
  it('测试组件销毁移除selection', () => {
    const wrapper = mount(
      <CrossTable 
        rowKey={o => o.id}
        columns={columns}
        dataSource={[{id: '1'}, {id: '2'}]}
        crossOption={{
          uid: 'handleSelectAll',
          allIds: ['1', '2', '3'],
          total: 3
        }}
      />
    )
    wrapper.find('a').first().simulate('click')
    wrapper.instance().componentWillUnmount()
    expect(wrapper.instance().selection.selectedRowKeys.slice()).toEqual([])
  })
})