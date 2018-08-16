import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CheckList = styled.ul`
  position: absolute;
  right: 0;
  list-style-type: none;
`;
const FeatureCheckList = ({ onFeatureToggle }) => (
  <CheckList>
    <li>
      <label htmlFor="stripes">
        <input id="stripes" type="checkbox" defaultChecked onClick={onFeatureToggle} />
          Row Stripes
      </label>
    </li>
    <li>
      <label htmlFor="fixed-header">
        <input id="fixed-header" type="checkbox" defaultChecked onClick={onFeatureToggle} />
          Fixed Header
      </label>
    </li>
  </CheckList>
);

FeatureCheckList.propTypes = {
  onFeatureToggle: PropTypes.func,
};

FeatureCheckList.defaultProps = {
  onFeatureToggle: () => {},
};

export default FeatureCheckList;
