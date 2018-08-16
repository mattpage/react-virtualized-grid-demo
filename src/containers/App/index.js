import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '../../components/Grid';
import FeatureCheckList from '../../components/FeatureCheckList';
import * as actions from './actions';

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  & > header {
    flex: 0 1 auto;
  }

  & > div {
    flex: 0 1 auto;
    height: 80%;
    width: 65%;
  }
`;

class App extends Component {

  static propTypes = {
    enableFixedHeader: PropTypes.bool,
    enableRowStriping: PropTypes.bool,
    toggleFixedHeader: PropTypes.func,
    toggleRowStriping: PropTypes.func,
  };

  static defaultProps = {
    enableFixedHeader: true,
    enableRowStriping: true,
    toggleFixedHeader: () => {},
    toggleRowStriping: () => {},
  };

  constructor(props){
    super(props);
    this.handleFeatureToggle = this.handleFeatureToggle.bind(this);
  }

  handleFeatureToggle(event) {
    if (event) {
      const { toggleFixedHeader, toggleRowStriping } = this.props;
      const id = event.target.getAttribute('id');
      switch (id) {
        case 'stripes':
          toggleRowStriping();
          break;
        case 'fixed-header':
          toggleFixedHeader();
          break;
        default:
          console.warn('Unexpected toggle id', id);
          break;
      }
    }
  }

  render() {

    const { enableFixedHeader, enableRowStriping } = this.props;

    const gridProps = {
      columns: [
        { label: 'ID' },
        { label: 'First Name' },
        { label: 'Middle Initial' },
        { label: 'Last Name' },
        { label: 'Title', width: 200 },
        { label: 'City' },
        { label: 'State' },
      ],
      rows: [
        [1, 'Alberto', 'C', 'Hernandez', 'Human Resources Representative', 'Phoenix', 'Arizona'],
        [2, 'Mike', 'A', 'Jones', 'Software Engineer', 'Salem', 'Oregon'],
        [3, 'Anna', 'P', 'Smith', 'Sr. Software Engineer', 'Olympia', 'Washington'],
        [4, 'Tim', 'E', 'Smith', 'Graphic Designer', 'Seattle', 'Washington'],
        [5, 'Barbara', 'A', 'Smith', 'Director of UX and Graphic Design', 'Los Angeles', 'California'],
        [6, 'Taylor', 'B', 'Johnson', 'Jr. Software Engineer', 'Irvine', 'California'],
        [7, 'Peter', 'A', 'Michaels', 'Technical Manager', 'Austin', 'Texas'],
        [8, 'Pete', 'N', 'Bond', 'Software Engineer', 'Boise', 'Idaho'],
        [9, 'Carol', 'F', 'Pickels', 'UX Designer', 'Palm Beach', 'Florida'],
        [10, 'Kelly', 'J', 'Jones', 'Technical Manager', 'Denver', 'Colorado'],
        [11, 'Francis', 'R', 'Kelly', 'Principal Software Engineer', 'Austin', 'Texas'],
        [12, 'Brian', 'R', 'Corwin', 'Talent Recruiter', 'Larkspur', 'New Mexico'],
        [13, 'Dean', 'C', 'Jacobs', 'Jr. UX Designer', 'Miami', 'Florida'],
        [14, 'Sarah', 'K', 'Yeats', 'Jr. Software Engineer', 'San Francisco', 'California'],
        [15, 'Ali', 'S', 'Nariz', 'Technical Manager', 'Denton', 'Texas'],
        [16, 'Darren', 'B', 'Wood', 'Sr. HR Manager', 'Chicago', 'Illinois'],
        [17, 'Karen', 'W', 'Fields', 'UX Designer', 'New York', 'New York'],
        [18, 'Matt', 'N', 'Peterson', 'Software Developer', 'Portland', 'Oregon'],
        [19, 'Mark', 'A', 'Thompson', 'Sr. Software Developer', 'Huntington Beach', 'California'],
        [20, 'Beth', 'B', 'Keats', 'Technical Support Engineer', 'San Francisco', 'California'],
      ],
      enableFixedHeader,
      enableRowStriping,
    };

    return (
      <AppContainer>
        <FeatureCheckList onFeatureToggle={this.handleFeatureToggle} />
        <header>
          <h1>
            React-Virtualized Grid Demo
          </h1>
        </header>
        <div>
          <Grid {...gridProps} />
        </div>
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  //TODO - refactor to use reselect
  enableFixedHeader: state.app.enableFixedHeader,
  enableRowStriping: state.app.enableRowStriping,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleFixedHeader: actions.toggleFixedHeader,
    toggleRowStriping: actions.toggleRowStriping,
  },
  dispatch
);
export { default as reducer } from './reducer';
export default connect(mapStateToProps, mapDispatchToProps)(App);
