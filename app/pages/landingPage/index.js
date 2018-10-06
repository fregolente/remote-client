import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHelmet from '~/components/pageHelmet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
// Material UI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Favorite from '@material-ui/icons/Favorite';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
// Utilities
import dummy from '~/utilities/dummyContents';
import timelineData from '~/utilities/mockTimelineData';
// Components
import Cover from '~/components/cover';
import About from '~/components/about';
import Connection from '~/components/connection';
import Favorites from '~/components/favorites';
import Albums from '~/components/albums';
import TabContainer from '~/components/tabContainer';
// Actions
import {
  fetchAction
} from '~/state/timeline/actions';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    console.log(timelineData);
    this.props.fetchData(timelineData);
  }

  handleChange = (e, value) => {
    e.preventDefault();
    this.setState({ value });
  };

  render() {
    const { dataProps } = this.props;
    const { value } = this.state;
    return (
      <div id="landing-page">
        <PageHelmet title="Profile" />
        <Cover
          coverImg="/images/material_bg.svg"
          avatar={dummy.user.avatar}
          name={dummy.user.name}
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <AppBar position="static" color="default">
          <Hidden mdUp>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              centered
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<AccountCircle />} />
              <Tab icon={<SupervisorAccount />} />
              <Tab icon={<Favorite />} />
              <Tab icon={<PhotoLibrary />} />
            </Tabs>
          </Hidden>
          <Hidden smDown>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              centered
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<AccountCircle />} label="ABOUT" />
              <Tab icon={<SupervisorAccount />} label="20 CONNECTIONS" />
              <Tab icon={<Favorite />} label="18 FAVORITES" />
              <Tab icon={<PhotoLibrary />} label="4 ALBUMS" />
            </Tabs>
          </Hidden>
        </AppBar>
        {value === 0 &&
          <TabContainer>
            <About data={timelineData} />
          </TabContainer>
        }
        {value === 1 &&
          <TabContainer>
            <Connection />
          </TabContainer>
        }
        {value === 2 &&
          <TabContainer>
            <Favorites />
          </TabContainer>
        }
        {value === 3 &&
          <TabContainer>
            <Albums />
          </TabContainer>
        }
      </div>
    );
  }
}

LandingPage.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dataProps: state.timeline.dataTimeline,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: fetchAction,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
