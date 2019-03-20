import React, { Component } from 'react';
import { connect } from 'react-redux';
import { anyPass, isEmpty, isNil } from 'ramda';
import Radium from 'radium';
import { generate } from 'shortid';

import {
  Avatar,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@material-ui/core';


// Components
import PageHelmet from '~/components/pageHelmet';

// Utilities
import { breakString } from '~/utilities/string';
import {
  getUserInitials,
  getLatestMessage,
  getMessageFormatedDate,
  getSenderName,
  getOtherParticipantName,
} from '~/utilities/chatHelper';

import * as styles from './styles';

const isNilOrEmpty = anyPass([isNil, isEmpty]);

// MOCK
const currentDate = new Date();
const pastDate = currentDate.setDate(5);
const ALL_CHAT_LIST = [
  {
    caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
    participants: [
      {
        first: 'Daniel',
        last: 'Ferraz',
      },
      {
        first: 'me',
        last: 'last',
      }
    ],
    topic: 'Pet abandoned by owner',
    messages: [
      {
        caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
        from: {
          first: 'Daniel',
          last: 'Ferraz',
        },
        to: {
          first: 'me',
          last: 'last',
        },
        date: pastDate,
        content: 'Good afternoon. I see you need some assistance to seek justice for the abandoned Pet. You can count on me for that. Let\'s chat further',
        delivered: true,
      },
      {
        caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
        from: {
          first: 'Daniel',
          last: 'Ferraz',
        },
        to: {
          first: 'me',
          last: 'last',
        },
        date: pastDate,
        content: 'Good afternoon. I see you need some assistance to seek justice for the abandoned Pet. You can count on me for that. Let\'s chat further',
        delivered: true,
      },
      {
        caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
        from: {
          first: 'Daniel',
          last: 'Ferraz',
        },
        to: {
          first: 'me',
          last: 'last',
        },
        date: pastDate,
        content: 'Good afternoon. I see you need some assistance to seek justice for the abandoned Pet. You can count on me for that. Let\'s chat further',
        delivered: true,
      },
      {
        caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
        from: {
          first: 'Daniel',
          last: 'Ferraz',
        },
        to: {
          first: 'me',
          last: 'last',
        },
        date: pastDate,
        content: 'Good afternoon. I see you need some assistance to seek justice for the abandoned Pet. You can count on me for that. Let\'s chat further',
        delivered: true,
      },
      {
        caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
        from: {
          first: 'Daniel',
          last: 'Ferraz',
        },
        to: {
          first: 'me',
          last: 'last',
        },
        date: pastDate,
        content: 'Good afternoon. I see you need some assistance to seek justice for the abandoned Pet. You can count on me for that. Let\'s chat further',
        delivered: true,
      },
      {
        caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
        from: {
          first: 'Daniel',
          last: 'Ferraz',
        },
        to: {
          first: 'me',
          last: 'last',
        },
        date: pastDate,
        content: 'Good afternoon. I see you need some assistance to seek justice for the abandoned Pet. You can count on me for that. Let\'s chat further',
        delivered: true,
      },
      {
        caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
        from: {
          first: 'Daniel',
          last: 'Ferraz',
        },
        to: {
          first: 'me',
          last: 'last',
        },
        date: pastDate,
        content: 'Good afternoon. I see you need some assistance to seek justice for the abandoned Pet. You can count on me for that. Let\'s chat further',
        delivered: true,
      },
      {
        caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
        from: {
          first: 'Daniel',
          last: 'Ferraz',
        },
        to: {
          first: 'me',
          last: 'last',
        },
        date: pastDate,
        content: 'Good afternoon. I see you need some assistance to seek justice for the abandoned Pet. You can count on me for that. Let\'s chat further',
        delivered: true,
      },
      {
        caseId: 'f546q564-q5w6f564q-f54qf456q6f-56fq6f5q4',
        from: {
          first: 'Daniel',
          last: 'Ferraz',
        },
        to: {
          first: 'me',
          last: 'last',
        },
        date: currentDate,
        content: 'Are you still in need of my help? It seems a bit since my first message.',
        delivered: true,
      },
    ],
  },
];


class MyChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: null,
    };
  }

  chatList = () => {
    return ALL_CHAT_LIST.map((chat) => {
      const latestMessage = getLatestMessage(chat.messages);
      return (
        <ListItem button key={`chat-list-item---${generate()}`} onClick={() => this.selectChat(chat)}>
          <ListItemAvatar>
            <Avatar >{getUserInitials(chat.participants[0])}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={chat.topic}
            secondary={
              <React.Fragment>
                <Typography component="span" color="textPrimary">
                  {`${getSenderName(latestMessage)} - ${getMessageFormatedDate(latestMessage)}`}
                </Typography>
                {breakString(latestMessage.content)}
              </React.Fragment>
            } />
        </ListItem>
      );
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  selectChat = (chat) => {
    this.setState({ chat }, () => this.scrollToBottom());
  }

  unselectChat = () => {
    this.setState({ chat: null });
  }

  listChatMessages = () => {
    const { messages } = this.state.chat;

    // TODO: check if its sender or receiver
    return messages.map(message => (
      <div key={`chat-message---${generate()}`} style={styles.chatMessageText}>
        <Typography variant="body2" gutterBottom>{message.content}</Typography>
        <Typography variant="overline" gutterBottom>
          {getMessageFormatedDate(message)}
        </Typography>
      </div>
    ));
  }

  openThisChat = () => {
    const { chat } = this.state;
    if (isNilOrEmpty(chat)) {
      // TODO: center message
      return (
        <Grid container style={styles.chatOpenedContainer} id="chat-opened-container">
          <p> No chats selected </p>
        </Grid>);
    }

    const latestMessage = getLatestMessage(chat.messages);

    return (
      <Grid container style={styles.chatOpenedContainer} id="chat-opened-container">
        <Grid item xs={11} style={styles.chatHeaderContainer} id="chat-header-container">
          <h3>{chat.topic}</h3> <Button onClick={() => this.unselectChat()}>close this chat</Button>
          <span>Chat with {getOtherParticipantName(chat.participants)} | Last update: {getMessageFormatedDate(latestMessage)}</span>
        </Grid>
        <Grid item xs={11} style={styles.messagesContainer} id="chat-messages-container">
          {this.listChatMessages()}
          <div style={{ float: 'left', clear: 'both' }} ref={(el) => { this.messagesEnd = el; }} />
        </Grid>
        <Grid item xs={11} style={styles.newMessageContainer} id="new-chat-container">
          <p>input and button for text messages</p>
        </Grid>
      </Grid>);
  }

  render() {
    return (
      <div>
        <Grid container style={styles.mainContainer}>
          <PageHelmet title="My Chats" />
          <Grid item xs={11}>
            <h1>My chats</h1>
          </Grid>
          <Grid item xs={11}>
            <Card style={styles.cardContainer}>
              <Grid container>
                <Grid item xs={3}>
                  <List>
                    {this.chatList()}
                  </List>
                </Grid>
                <Grid item xs={9} style={{ borderLeft: '1px solid lightgray' }}>
                  {this.openThisChat()}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

      </div>
    );
  }
}

MyChats.propTypes = {
};

const mapDispatchToProps = {
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Radium(MyChats));
