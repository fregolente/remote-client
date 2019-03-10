import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Chip,
  Tooltip,
  Typography,
  IconButton,
} from '@material-ui/core';

import {
  Delete,
  Star,
  StarBorder,
} from '@material-ui/icons';

import * as styles from './styles';

class CaseCard extends Component {
  constructor(props) {
    super(props);
    this.props = props

    this.state = {
      openDeleteDialog: false,
      isFavorite: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ openDeleteDialog: true });
  };

  handleClose = () => {
    this.setState({ openDeleteDialog: false });
  };

  renderDeleteDialog = () => {
    const { userCase } = this.props;

    return (<Dialog
      open={this.state.openDeleteDialog}
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm to delete this case?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This is an irreversible action. Do you confirm your action to
          delete the case with the title "{userCase.title}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary" autoFocus>
          Disagree
        </Button>
        <Button onClick={this.handleClose} color="secondary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>);
  }

  toggleFavorite = () => this.setState({ isFavorite: !this.state.isFavorite });

  showUserButtons = () => (<div>
    <Tooltip title="Delete">
      <IconButton color="primary" size="small" aria-label="Favorite" onClick={() => this.handleClickOpen()}>
        <Delete />
      </IconButton>
    </Tooltip>
    <Button size="small" color="secondary">More</Button>
    <Button variant="contained" size="small" color="secondary">Edit</Button>
  </div>);

  getFavoriteButton = () => {
    const { isFavorite } = this.state;
    const icon = isFavorite ? <Star /> : <StarBorder />

    return (<Tooltip title="Favorite">
      <IconButton color="primary" size="small" aria-label="Favorite" onClick={() => this.toggleFavorite()}>
        {icon}
      </IconButton>
    </Tooltip>);
  }

  showLawyerButtons = () => (<div>
    {this.getFavoriteButton()}
    <Button size="small" color="secondary">More</Button>
    <Button variant="contained" size="small" color="secondary">Apply</Button>
  </div >);

  render() {
    const { caseStyle, columns, userCase, isInExplorerPage } = this.props;

    return (
      <Grid item xs={columns} id={`case-card-item----${userCase.id}`} key={userCase.id} style={caseStyle}>
        <Card >
          <CardContent style={styles.cardContent}>
            <Typography variant="h5" component="h2">
              {userCase.title} <Chip label={`${userCase.suggestedPrice} ${userCase.priceType.label}`} className={styles.chip} color="primary" />
            </Typography>
            <Typography className={styles.pos} color="textSecondary">
              Created at {userCase._createdAt}
            </Typography>
            <Typography>
              {userCase.description}
              <br />
              <br />
              <br />
              <br />
              {`${userCase.caseRegions.label} | ${userCase.caseAreas.label}`}
            </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            {isInExplorerPage ? this.showLawyerButtons() : this.showUserButtons()}
          </CardActions>
        </Card>
        {this.renderDeleteDialog()}
      </Grid>
    );
  }
}

CaseCard.defaultPropTypes = {
  isInExplorerPage: true,
  caseStyle: {},
};

CaseCard.propTypes = {
  userCase: PropTypes.object.isRequired,
  columns: PropTypes.number.isRequired,
  isInExplorerPage: PropTypes.bool,
  caseStyle: PropTypes.object,
};

const mapDispatchToProps = {
  push,
};

export default connect(null, mapDispatchToProps)(Radium(CaseCard));