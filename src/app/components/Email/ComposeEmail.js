import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import ComposeEmailForm from './ComposeEmailForm';
import FloatingPanel from './../Panel/FloatingPanel';
import styles from './email-jss';

class ComposeEmail extends React.Component {
  render() {
    const {
      classes,
      open,
      closeForm,
      sendEmail,
      to,
      subject,
      validMail,
      inputChange,
      compose
    } = this.props;
    const branch = '';
    return (
      <div>
        <Tooltip title="Compose Email">
          <Button variant="fab" color="secondary" onClick={() => compose()} className={classes.addBtn}>
            <Add />
          </Button>
        </Tooltip>
        <FloatingPanel
          openForm={open}
          branch={branch}
          closeForm={closeForm}
          title="Compose Email"
          extraSize
        >
          <ComposeEmailForm
            to={to}
            subject={subject}
            validMail={validMail}
            sendEmail={sendEmail}
            closeForm={closeForm}
            inputChange={inputChange}
          />
        </FloatingPanel>
      </div>
    );
  }
}

ComposeEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  validMail: PropTypes.string.isRequired,
  compose: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(ComposeEmail);
