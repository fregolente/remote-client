import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import Tooltip from '@material-ui/core/Tooltip';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Components
import Comment from '~/components/comment';

// Component Styles
import styles from './styles';

const optionsOpt = [
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      anchorElOpt: null,
      openComment: false,
    };
  }

  handleClickOpt = event => {
    this.setState({ anchorElOpt: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  handleOpenComment = (data) => {
    this.props.fetchComment(data);
    this.setState({ openComment: true });
  };

  handleCloseComment = () => {
    this.setState({ openComment: false });
  };

  getItem = () => {
    const {
      classes,
      dataTimeline,
      onlike,
    } = this.props;

    const { anchorElOpt } = this.state;

    return dataTimeline.map(data => (
      <li key={data.id}>
        <div className={classes.iconBullet}>
          <Tooltip id={'tooltip-icon-' + data.id} title={data.time}>
            <Icon className={classes.icon}>
              {data.icon}
            </Icon>
          </Tooltip>
        </div>
        <Card className={classes.cardSocmed}>
          <CardHeader
            avatar={<Avatar alt="avatar" src={data.avatar} className={classes.avatar} />}
            action={
              <IconButton
                aria-label="More"
                aria-owns={anchorElOpt ? 'long-menu' : null}
                aria-haspopup="true"
                className={classes.button}
                onClick={this.handleClickOpt}>
                <MoreVertIcon />
              </IconButton>
            }
            title={data.name}
            subheader={data.date} />
          {data.image !== '' &&
            <CardMedia
              className={classes.media}
              image={data.image}
              title={data.name} />
          }
          <CardContent>
            <Typography>
              {data.content}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Like this" onClick={() => onlike(data)}>
              <FavoriteIcon className={data.liked ? classes.liked : ''} />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <div className={classes.rightIcon} >
              <Typography variant="caption" component="span">
                {data.comments !== undefined ? data.comments.length : 0}
              </Typography>
              <IconButton aria-label="Comment" onClick={() => this.handleOpenComment(data)}>
                <CommentIcon />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </li>
    ));
  }

  render() {
    const {
      classes,
      dataTimeline,
      commentIndex,
      submitComment,
    } = this.props;
    const { anchorElOpt, openComment } = this.state;

    return (
      <Fragment>
        <Menu
          id="long-menu"
          anchorEl={anchorElOpt}
          open={Boolean(anchorElOpt)}
          onClose={this.handleCloseOpt}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}>
          {optionsOpt.map(option => (
            <MenuItem key={option} selected={option === 'Edit Profile'} onClick={this.handleCloseOpt}>
              {option}
            </MenuItem>
          ))}
        </Menu>
        <Comment
          open={openComment}
          handleClose={this.handleCloseComment}
          submitComment={submitComment}
          dataComment={dataTimeline[commentIndex].comments} />
        <ul id="timeline-posts" className={classes.timeline}>
          {this.getItem()}
        </ul>
      </Fragment>
    );
  }
}

Timeline.propTypes = {
  classes: PropTypes.object.isRequired,
  onlike: PropTypes.func,
  dataTimeline: PropTypes.array.isRequired,
  fetchComment: PropTypes.func,
  submitComment: PropTypes.func,
  commentIndex: PropTypes.number,
};

Timeline.defaultProps = {
  onlike: () => (false),
  fetchComment: () => { },
  submitComment: () => { },
  commentIndex: 0,
};

export default withStyles(styles)(Timeline);
