import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Send from '@material-ui/icons/Send';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';
import withMobileDialog from '@material-ui/core/withMobileDialog';


import Type from '~/styles/components/Typography.scss';

import dummy from '~/utilities/dummyContents';

// Component Styles
import styles from './styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      comment: ''
    };
  }

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = comment => {
    this.props.submitComment(comment);
    this.setState({ comment: '' });
  }

  getItem = (dataArray) => {
    const { classes } = this.props;

    dataArray.map(data => (
      <Fragment key={data.id}>
        <ListItem>
          <div className={classes.commentContent}>
            <div className={classes.commentHead}>
              <Avatar alt="avatar" src={data.avatar} className={classes.avatar} />
              <section>
                <Typography variant="subheading">{data.from}</Typography>
                <Typography variant="caption"><span className={classNames(Type.light, Type.textGrey)}>{data.date}</span></Typography>
              </section>
            </div>
            <Typography className={classes.commentText}>{data.message}</Typography>
          </div>
        </ListItem>
        <Divider inset />
      </Fragment>
    ));
  }

  render() {
    const {
      open,
      handleClose,
      classes,
      dataComment,
      fullScreen
    } = this.props;

    const { comment } = this.state;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          TransitionComponent={Transition}
          maxWidth="md">
          <DialogTitle id="form-dialog-title">
            <CommentIcon />
            {dataComment !== undefined && dataComment.size}
            &nbsp;Comment{dataComment !== undefined && dataComment.size > 1 ? 's' : ''}
            <IconButton onClick={handleClose} className={classes.buttonClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <List>
              {dataComment !== undefined && this.getItem(dataComment)}
            </List>
          </DialogContent>
          <DialogActions className={classes.commentAction}>
            <div className={classes.commentForm}>
              <Avatar alt="avatar" src={dummy.user.avatar} className={classes.avatarMini} />
              <Input
                placeholder="Write Comment"
                onChange={this.handleChange}
                value={comment}
                className={classes.input}
                inputProps={{ 'aria-label': 'Comment', }} />
              <Button variant="fab" mini onClick={() => this.handleSubmit(comment)} color="secondary" aria-label="send" className={classes.button}>
                <Send />
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Comment.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dataComment: PropTypes.array,
  fullScreen: PropTypes.bool.isRequired,
};

Comment.defaultProps = {
  dataComment: []
};

const CommentResponsive = withMobileDialog()(Comment);
export default withStyles(styles)(CommentResponsive);
