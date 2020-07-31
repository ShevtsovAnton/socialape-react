import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Scream from '../components/Scream';
import Profile from '../components/Profile';

export class home extends Component {
  state = {
    screams: null,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    axios
      .get('/screams')
      .then((res) => {
        if (this._isMounted) {
          this.setState({
            screams: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let recentScreamsMarkup = this.state.screams
      ? this.state.screams.map((scream) => (
          <Scream key={scream.screamId} scream={scream} />
        ))
      : null;
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default home;
