import React from 'react';
import { shallow } from 'enzyme';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import Grid, { GridContainer } from '../index';

describe('Grid', () => {

  it('should render the Grid', () => {
    const wrapper = shallow(<Grid height={400} width={400} />);
    expect(wrapper).toHaveLength(1);
  });

  it('should render the AutoSizer', () => {
    const wrapper = shallow(<Grid height={400} width={400} />);
    const autoSizer = wrapper.find(AutoSizer);
    expect(autoSizer).toHaveLength(1);
  });

  it('should render the GridContainer', () => {
    const wrapper = shallow(<Grid height={400} width={400} />);
    const autoSizer = wrapper.find(AutoSizer);
    const container = shallow(autoSizer.get(0)).find(GridContainer);
    expect(container).toHaveLength(1);
    // expect(container.find(MultiGrid)).toHaveLength(1);
  });

  it('should render the MultiGrid', () => {
    const wrapper = shallow(<Grid height={400} width={400} />);
    const autoSizer = wrapper.find(AutoSizer);
    const container = shallow(autoSizer.get(0)).find(GridContainer);
    expect(container.find(MultiGrid)).toHaveLength(1);
  });
});
