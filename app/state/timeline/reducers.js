import dummy from '~/utilities/dummyContents';
import { getDate, getTime } from '~/utilities/dateTime';
import notificationMessages from '~/utilities/notificationMessages';

import {
  FETCH_TIMELINE_DATA,
  POST,
  TOGGLE_LIKE,
  FETCH_COMMENT_DATA,
  POST_COMMENT,
  CLOSE_NOTIF
} from './actions';

const initialState = {
  dataTimeline: [],
  commentIndex: 0,
  notifMsg: '',
};

const icon = privacyType => {
  switch (privacyType) {
    case 'public':
      return 'language';
    case 'friends':
      return 'people';
    default:
      return 'lock';
  }
};

const buildTimeline = (text, image, privacy) => {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  const imageSrc = image[0] !== undefined ? image[0].preview : '';
  return {
    id,
    name: 'John Doe',
    date: getDate(),
    time: getTime(),
    icon: icon(privacy),
    avatar: dummy.user.avatar,
    image: imageSrc,
    content: text,
    liked: false,
    comments: []
  };
};

const buildComment = (message, curData) => {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  const newData = {
    id,
    from: 'John Doe',
    avatar: dummy.user.avatar,
    date: getDate(),
    message,
  };
  return curData.push(newData);
};

const commentPost = (dataTimeline, post) => {
  const indexOfPost = dataTimeline.indexOf(post);
  const updatePost = {
    ...dataTimeline[indexOfPost],
    liked: !dataTimeline[indexOfPost].liked,
  };

  dataTimeline[indexOfPost] = updatePost;

  return dataTimeline;
}

const likePost = (dataTimeline, post) => {
  const indexOfPost = dataTimeline.indexOf(post);
  const updatePost = {
    ...dataTimeline[indexOfPost],
    liked: !dataTimeline[indexOfPost].liked,
  };

  dataTimeline[indexOfPost] = updatePost;

  return dataTimeline;
}

export default function timelineReducer(state = initialState, action = {}) {
  console.log('Timeline Reducer, before switch: ', action);
  switch (action.type) {
    case FETCH_TIMELINE_DATA:
      console.log(`Timeline Reducer -> ${action.type}, and: `, action.items)
      return {
        ...state,
        dataTimeline: action.items,
      };
    case POST:
      return {
        ...state,
        dataTimeline: buildTimeline(action.text, action.media, action.privacy),
        notifMsg: notificationMessages.posted,
      };
    case TOGGLE_LIKE:
      const timelineUpdated = likePost(state.dataTimeline, action.item);

      // this does not account for many users liking
      return {
        ...state,
        dataTimeline: timelineUpdated,
      };
    case FETCH_COMMENT_DATA:
      // const timelineUpdated = commentPost(state.dataTimeline, action.item);
    /* return state.withMutations((mutableState) => {
      const index = state.get('dataTimeline').indexOf(action.item);
      mutableState.set('commentIndex', index);
    }); */
    case POST_COMMENT:
      // const timelineUpdated = commentPost(state.dataTimeline, action.item);

      /* return state.withMutations((mutableState) => {
        mutableState
          .update('dataTimeline',
            dataTimeline => dataTimeline.setIn(
              [state.get('commentIndex'), 'comments'],
              buildComment(action.comment, state.getIn(['dataTimeline', state.get('commentIndex'), 'comments']))
            )
          )
          .set('notifMsg', notificationMessages.commented);
      });*/
    case CLOSE_NOTIF:
      return {
        ...state,
        notifMsg: '',
      }
    default:
      return state;
  }
}
