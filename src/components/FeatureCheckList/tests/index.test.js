import React from 'react';
import { shallow } from 'enzyme';
import FeatureCheckList from '../index';

describe('FeatureCheckList', () => {

  it('should render the FeatureCheckList', () => {
    const wrapper = shallow(<FeatureCheckList />);
    expect(wrapper).toHaveLength(1);
    const checkboxes = wrapper.find('input[type="checkbox"]');
    expect(checkboxes).toHaveLength(2);
  });

  it('should call the toggle callback on checkbox change', () => {
    const callback = jest.fn();
    const wrapper = shallow(<FeatureCheckList onFeatureToggle={callback} />);
    const checkbox = wrapper.find('input[type="checkbox"]').first();
    checkbox.simulate('click');
    expect(callback).toHaveBeenCalled();
  });

});
