import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { find, propEq, includes } from 'ramda';

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

// Actions
import { favoriteACase, unfavoriteACase } from '~/state/lawyers/actions';

// Selectors
import {
  currentUserLawyerId,
  lawyerAppliedCases,
  lawyerFavoritedCases,
} from '~/state/currentUser/selectors';

// Utilities
import { formatMoney } from '~/utilities/numbers';
import { getFormattedDate } from '~/utilities/dateTime';
import { getFromLocalStorage } from '~/utilities/localStorage';
import { getValueFromId } from '~/utilities/case';

import * as styles from './styles';

const UTILITIES = getFromLocalStorage('utilities');

class CaseCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      openDeleteDialog: false,
      openApplyDialog: false,
      showFullDescription: false,
    };
  }

  getShowMoreButton = () => {
    const linkText = this.state.showFullDescription ? 'show less' : 'show more';
    return (
      <Button onClick={this.toggleFullDescription} size="small">
        {linkText}
      </Button>
    );
  }

  getDescription = (description) => {
    if (description.length <= 100) {
      return description;
    }

    let cutDescription = description.slice(0, 99);

    if (this.state.showFullDescription) {
      cutDescription = description;
    }

    return (
      <span>
        {cutDescription}
        {(this.state.showFullDescription === false) && '...'}
        {this.getShowMoreButton()}
      </span>
    );
  }

  getFavoriteButton = () => {
    // const { isFavorite } = this.state;
    const icon = this.hasFavoritedCase() ? <Star /> : <StarBorder />;

    return (
      <Tooltip title="Favorite">
        <IconButton color="primary" size="small" aria-label="Favorite" onClick={() => this.toggleFavorite()}>
          {icon}
        </IconButton>
      </Tooltip>
    );
  }

  getLawyerApplyButton = () => {
    const hasApplied = this.hasAppliedToCase();
    const buttonText = hasApplied ? 'Applied' : 'Apply now!';

    return (
      <Button
        onClick={this.handleOpenApplyDialog}
        variant="contained"
        size="small"
        color="secondary"
        disabled={hasApplied}>
        {buttonText}
      </Button>
    );
  }

  getCaseRegion = (region) => {
    if (region.label) {
      return region.label;
    }

    const { userRegion } = UTILITIES;
    const fullRegion = find(propEq('id', region))(userRegion);
    return fullRegion.label;
  }

  getCasePracticeArea = (practiceArea) => {
    if (practiceArea.label) {
      return practiceArea.label;
    }

    const { practiceArea: practiceAreas } = UTILITIES;
    const fullPracticeArea = find(propEq('id', practiceArea))(practiceAreas);
    return fullPracticeArea.label;
  }

  getPriceTypeLabel = (priceType) => {
    if (priceType.label) {
      return priceType.label;
    }

    const { priceType: uPriceType } = UTILITIES;
    const fullPriceType = find(propEq('id', priceType))(uPriceType);
    return fullPriceType.label;
  }

  toggleFavorite = () => {
    const {
      currentUserLawyerId: lawyerId,
      userCase,
    } = this.props;
    const {
      _id: caseId,
    } = userCase;

    if (this.hasFavoritedCase()) {
      // unfavorite
      this.props.unfavoriteACase(caseId, lawyerId);
      return;
    }

    // favorite
    this.props.favoriteACase(caseId, lawyerId);
  }

  handleClickOpen = () => {
    this.setState({ openDeleteDialog: true });
  };

  handleOpenApplyDialog = () => {
    this.setState({ openApplyDialog: true });
  };

  handleClose = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleCloseApply = () => {
    this.setState({ openApplyDialog: false });
  };

  handleApply = () => {
    if (this.props.caseApplyAction) {
      const {
        currentUserLawyerId: lawyerId,
        userCase,
      } = this.props;
      const {
        _id: caseId,
      } = userCase;

      this.props.caseApplyAction(caseId, lawyerId);
    }
    this.handleCloseApply();
  }

  handleClickFullCase = () => {
    const { fullCaseAction, userCase } = this.props;

    if (fullCaseAction) {
      fullCaseAction(userCase);
    }
  };

  toggleFullDescription = () => {
    this.setState({ showFullDescription: !this.state.showFullDescription });
  }

  applyForCaseDialog = () => {
    return (
      <Dialog
        open={this.state.openApplyDialog}
        onClose={this.handleCloseApply}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {'Confirm apply to this case?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={styles.contentTextApplyDialog}>
            This action will show interest in working for this case.<br />
            The user will then be able to open a chat with you.<br />
            This action <strong>can not</strong> be undone<br />
            <strong>Confirm this apply?</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseApply} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={this.handleApply} color="secondary">
            Apply!
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  showLawyerButtons = () => (
    <div>
      {this.getFavoriteButton()}
      {this.getLawyerApplyButton()}
    </div>
  );

  hasFavoritedCase = () => {
    const {
      favoritedCases,
      userCase,
    } = this.props;
    const {
      _id: caseId,
    } = userCase;

    return includes(caseId, favoritedCases);
  }

  showUserButtons = () => (
    <div>
      <Tooltip title="Delete">
        <IconButton color="primary" size="small" aria-label="Favorite" onClick={this.handleClickOpen}>
          <Delete style={styles.icon} />
        </IconButton>
      </Tooltip>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        style={styles.button}
        onClick={this.handleClickFullCase}>
        See full case
      </Button>
    </div>
  );

  hasAppliedToCase = () => {
    const {
      appliedCases,
      userCase,
    } = this.props;
    const {
      _id: caseId,
    } = userCase;

    return includes(caseId, appliedCases);
  }

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
              <strong>{title}</strong>
              <Chip
                label={`${formatMoney(suggestedPrice)} ${this.getPriceTypeLabel(priceType)}`}
                style={styles.chip}
                color="primary" />
            </Typography>
            <Typography className={styles.pos} color="textSecondary">
              Created at {getFormattedDate(createdAt)}
            </Typography>
            <Typography>
              {this.getDescription(description)}
            </Typography>
            <Typography style={{ paddingTop: '25px' }}>
              <strong>{`${this.getCaseRegion(region)} | ${this.getCasePracticeArea(practiceArea)}`}</strong>
            </Typography>
          </CardContent>
          <CardActions>
            {isInExplorerPage ? this.showLawyerButtons() : this.showUserButtons()}
          </CardActions>
        </Card>
        {this.applyForCaseDialog()}
        {this.renderDeleteDialog()}
      </Grid>
    );
  }
}

CaseCard.defaultProps = {
  isInExplorerPage: true,
  caseStyle: {},
  fullCaseAction: null,
  caseApplyAction: null,
  currentUserLawyerId: '',
  appliedCases: [],
  favoritedCases: [],
};

CaseCard.propTypes = {
  userCase: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  columns: PropTypes.number.isRequired,
  isInExplorerPage: PropTypes.bool,
  caseStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  fullCaseAction: PropTypes.func,
  caseApplyAction: PropTypes.func,
  favoriteACase: PropTypes.func.isRequired,
  unfavoriteACase: PropTypes.func.isRequired,
  currentUserLawyerId: PropTypes.string,
  appliedCases: PropTypes.arrayOf(PropTypes.string),
  favoritedCases: PropTypes.arrayOf(PropTypes.string),
};

const mapDispatchToProps = {
  push,
  favoriteACase,
  unfavoriteACase,
};

const mapStateToProps = state => ({
  currentUserLawyerId: currentUserLawyerId(state),
  appliedCases: lawyerAppliedCases(state),
  favoritedCases: lawyerFavoritedCases(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Radium(CaseCard));
