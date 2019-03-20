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

// Utilities
import { formatMoney } from '~/utilities/numbers';
import { getFormattedDate } from '~/utilities/dateTime';

import * as styles from './styles';

class CaseCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      openDeleteDialog: false,
      isFavorite: false,
    };
  }

  getFavoriteButton = () => {
    const { isFavorite } = this.state;
    const icon = isFavorite ? <Star /> : <StarBorder />

    return (
      <Tooltip title="Favorite">
        <IconButton color="primary" size="small" aria-label="Favorite" onClick={() => this.toggleFavorite()}>
          {icon}
        </IconButton>
      </Tooltip>
    );
  }

  showUserButtons = () => (
    <div>
      <Tooltip title="Delete">
        <IconButton color="primary" size="small" aria-label="Favorite" onClick={() => this.handleClickOpen()}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={() => this.handleClickFullCase()}>See full case</Button>
    </div>
  );

  toggleFavorite = () => this.setState({ isFavorite: !this.state.isFavorite });

  handleClickOpen = () => {
    this.setState({ openDeleteDialog: true });
  };

  handleClose = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleClickFullCase = () => {
    const { fullCaseAction, userCase } = this.props;

    if (fullCaseAction) {
      fullCaseAction(userCase);
    }
  };

  showLawyerButtons = () => (
    <div>
      {this.getFavoriteButton()}
      <Button size="small" color="secondary">More</Button>
      <Button variant="contained" size="small" color="secondary">Apply</Button>
    </div>
  );

  renderDeleteDialog = () => {
    const { userCase } = this.props;

    return (
      <Dialog
        open={this.state.openDeleteDialog}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {'Confirm to delete this case?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is an irreversible action. Do you confirm your action to
            delete the case with the title {`"${userCase.title}"`}?
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
      </Dialog>
    );
  }

  render() {
    const {
      caseStyle,
      columns,
      userCase,
      isInExplorerPage,
    } = this.props;
    const {
      _id: id,
      createdAt,
      description,
      practiceArea,
      priceType,
      region,
      suggestedPrice,
      title,
    } = userCase;

    return (
      <Grid item xs={columns} id={`case-card-item----${id}`} key={id} style={caseStyle}>
        <Card >
          <CardContent style={styles.cardContent}>
            <Typography variant="h5" component="h2">
              {title}
              <Chip
                label={`${formatMoney(suggestedPrice)} ${priceType.label}`}
                style={styles.chip}
                color="primary" />
            </Typography>
            <Typography className={styles.pos} color="textSecondary">
              Created at {getFormattedDate(createdAt)}
            </Typography>
            <Typography>
              {description}
              <br />
              <br />
              <br />
              <br />
              {`${region.label} | ${practiceArea.label}`}
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

CaseCard.defaultProps = {
  isInExplorerPage: true,
  caseStyle: {},
  fullCaseAction: null,
};

CaseCard.propTypes = {
  userCase: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  columns: PropTypes.number.isRequired,
  isInExplorerPage: PropTypes.bool,
  caseStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  fullCaseAction: PropTypes.func,
};

const mapDispatchToProps = {
  push,
};

export default connect(null, mapDispatchToProps)(Radium(CaseCard));