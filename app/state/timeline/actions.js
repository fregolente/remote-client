
export const FETCH_TIMELINE_DATA = 'FETCH_TIMELINE_DATA';
export const fetchAction = (items) => {
  console.debug(`Timeline Fetch Action -> ${FETCH_TIMELINE_DATA}: `, items);
  return {
    type: FETCH_TIMELINE_DATA,
    items,
  };
}

export const POST = 'POST';
export const postAction = (text, media, privacy) => ({
  type: POST,
  text,
  media,
  privacy
});

export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const toggleLikeAction = (item) => ({
  type: TOGGLE_LIKE,
  item,
});

export const FETCH_COMMENT_DATA = 'FETCH_COMMENT_DATA';
export const fetchCommentAction = (item) => ({
  type: FETCH_COMMENT_DATA,
  item,
});

export const POST_COMMENT = 'POST_COMMENT';
export const postCommentAction = (comment) => ({
  type: POST_COMMENT,
  comment,
});

export const CLOSE_NOTIF = 'CLOSE_NOTIF';
export const closeNotifAction = {
  type: CLOSE_NOTIF
};