import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generate } from 'shortid';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {
  anyPass,
  isEmpty,
  isNil,
  trim,
  not,
  equals,
  pathOr,
} from 'ramda';


import {
  Avatar,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';

// Actions
import {
  getChats,
  sendNewChatMessage,
  clearSelectedChat,
  getChatById,
} from '~/state/chats/actions';

// Selectors
import {
  getChatDataSelector,
  getCurrentSelectedChat,
} from '~/state/chats/selectors';
import { currentUserId } from '~/state/currentUser/selectors';

// Components
import PageHelmet from '~/components/pageHelmet';

// Utilities
import { breakString } from '~/utilities/string';
import {
  checkIfUserSentThisMessage,
  getUserInitials,
  getLatestMessage,
  getMessageFormatedDate,
  getSenderName,
  getOtherParticipantName,
  getRecipient,
} from '~/utilities/chatHelper';

import * as styles from './styles';
import mui from './mui';

const isNilOrEmpty = anyPass([isNil, isEmpty]);

class MyChats extends Component {
  constructor(props) {
    super(props);
    this.getChatTimeOut = null;
    this.state = {
      chat: null,
    };
  }

  componentDidMount() {
    this.props.getChats();
  }

  componentWillReceiveProps(nextProps) {
    const { currentChat } = this.props;
    const messages = pathOr(undefined, ['messages'], currentChat);
    const nextMessages = pathOr(undefined, ['messages'], nextProps.currentChat);

    if (not(equals(messages, nextMessages))) {
      this.setState({ chat: nextProps.currentChat }, () => this.scrollToBottom());
    }
  }

  chatList = () => {
    const { userId, chatData, classes } = this.props;
    const { chats } = chatData;

    return chats.map((chat) => {
      const latestMessage = getLatestMessage(chat.messages);
      const { participants } = chat;
      return (
        <ListItem
          button
          key={`chat-list-item---${generate()}`}
          onClick={() => this.selectChat(chat)}
          style={{ borderBottom: '1px solid #6498c0' }}>
          <ListItemAvatar>
            <Avatar style={{ color: '#333', backgroundColor: '#fff' }} >{getUserInitials(userId, participants)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            classes={{
              primary: classes.primary,
            }}
            primary={chat.topic}
            secondary={
              <React.Fragment>
                <div style={{ color: '#FFF', fontSize: '13px' }}>
                  {`${getSenderName(latestMessage, participants)} - ${getMessageFormatedDate(latestMessage)}`}
                </div>
                <div style={{ color: '#FFF' }}>
                  {breakString(latestMessage.content)}
                </div>
              </React.Fragment>
            } />
        </ListItem>
      );
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  timeoutUpdateChatMessages = () => {
    const { _id: chatId } = this.state.chat;
    this.props.getChatById(chatId);
  }

  selectChat = (chat) => {
    clearInterval(this.getChatTimeOut);
    this.getChatTimeOut = setInterval(() => this.timeoutUpdateChatMessages(), 3000);
    this.setState({ chat }, () => this.scrollToBottom());
  }

  unselectChat = () => {
    clearInterval(this.getChatTimeOut);
    this.setState({ chat: null });
    this.props.getChats();
    this.props.clearSelectedChat();
  }

  listChatMessages = () => {
    const { messages } = this.state.chat;
    const { userId } = this.props;

    return messages.map((message) => {
      const didISendThat = checkIfUserSentThisMessage(userId, message);
      const { chatMessageText, myChatMessageText } = styles;
      const messageStyle = didISendThat ? myChatMessageText : chatMessageText;
      const messageKey = generate();
      return (
        <div key={`chat-message-container---${messageKey}`} style={styles.chatMessageContainer}>
          <div key={`chat-message---${messageKey}`} style={messageStyle}>
            <p>{message.content}</p>
            <span style={styles.messageTextTimestamp}>
              {getMessageFormatedDate(message)}
            </span>
          </div>
        </div>
      );
    });
  }

  handleInputChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      this.sendAMessage();
    }
  }

  sendAMessage = () => {
    const { newMessage } = this.state;
    const cleanMessage = trim(newMessage);

    if (not(isNilOrEmpty(cleanMessage))) {
      const { chat } = this.state;
      const { userId } = this.props;
      const { _id: chatId } = chat;
      const recipient = getRecipient(userId, chat.participants);
      const { _id: recipientId } = recipient[0];

      this.props.sendNewChatMessage(chatId, recipientId, cleanMessage);
      this.setState({ newMessage: '' });
    }
  }

  openThisChat = () => {
    const { userId, classes } = this.props;
    const { chat } = this.state;
    if (isNilOrEmpty(chat)) {
      return (
        <Grid container style={styles.chatOpenedContainer} id="chat-opened-container">
          <p> No chats selected </p>
        </Grid>);
    }

    const latestMessage = getLatestMessage(chat.messages);
    return (
      <Grid container style={styles.chatOpenedContainer} id="chat-opened-container">
        <Grid item xs={12} style={styles.chatHeaderContainer} id="chat-header-container">
          <Grid container>
            <Grid item xs={12}>
              <h3 style={{ margin: 0 }}>{chat.topic}</h3>
            </Grid>
            <Grid item xs={9} style={{ paddingTop: '10px', fontSize: '13px' }}>
              <span>
                Chat with {getOtherParticipantName(userId, chat.participants)}
                | Last update: {getMessageFormatedDate(latestMessage)}
              </span>
            </Grid>
            <Grid item xs={3}>
              <Button onClick={() => this.unselectChat()}>close this chat</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={styles.messagesContainer} id="chat-messages-container">
          {this.listChatMessages()}
          <div style={{ float: 'left', clear: 'both' }} ref={(el) => { this.messagesEnd = el; }} />
        </Grid>
        <Grid item xs={11} style={styles.newMessageContainer} id="new-chat-container">
          <TextField
            name="newMessage"
            value={this.state.newMessage}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            fullWidth
            rowsMax="4"
            margin="none"
            variant="outlined"
            style={{ marginTop: '8px' }}
            InputProps={{
              classes: {
                input: classes.input,
              },
            }} />
        </Grid>
        <Grid item xs={1} style={styles.newMessageContainer}>
          <IconButton
            onClick={this.sendAMessage}
            style={{ color: '#8cbadd' }}>
            <SendIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid >);
  }

  chatsCards = () => {
    return (
      <Grid container>
        <Grid item xs={3} style={{ backgroundColor: '#8cbadd' }}>
          <List>
            {this.chatList()}
          </List>
        </Grid>
        <Grid item xs={9} style={{ borderLeft: '1px solid #e8e8e8' }}>
          {this.openThisChat()}
        </Grid>
      </Grid>
    );
  }

  render() {
    const { loading, chats, error } = this.props.chatData;

    const isLoading = loading === true && chats.length === 0;
    const hasError = loading === false && !isEmpty(error);
    const errorText = <p>An error occured. {error}</p>;
    const noChats = !isLoading && isEmpty(chats) && !hasError;
    const noChatsText = <p>There are no chats yet</p>;

    return (
      <div>
        <Grid container style={styles.mainContainer}>
          <PageHelmet title="My Chats" />
          <Grid item xs={12}>
            <h1>My chats</h1>
          </Grid>
          <Grid item xs={12}>
            <Card style={styles.cardContainer}>
              {noChats && noChatsText}
              {hasError && errorText}
              {!noChats && this.chatsCards()}
            </Card>
          </Grid>
        </Grid>

      </div>
    );
  }
}

MyChats.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  chatData: PropTypes.shape({
    loading: PropTypes.bool,
    chats: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
  }).isRequired,
  getChats: PropTypes.func.isRequired,
  clearSelectedChat: PropTypes.func.isRequired,
  getChatById: PropTypes.func.isRequired,
  sendNewChatMessage: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentChat: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  getChats,
  sendNewChatMessage,
  clearSelectedChat,
  getChatById,
};

const mapStateToProps = state => ({
  chatData: getChatDataSelector(state),
  userId: currentUserId(state),
  currentChat: getCurrentSelectedChat(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(mui)(Radium(MyChats)));
