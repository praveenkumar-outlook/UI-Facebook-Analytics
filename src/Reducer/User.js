import _ from "underscore";
import actions from "../Action/ActionTypes";

const initialState = {
  userId: "",
  accessToken: "",
  userProfile: {},
  userStatistics: {}
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SAVE_USER_CREDENTIALS:
      return {
        ...state,
        userId: action.data.userId,
        accessToken: action.data.accessToken
      };
    case actions.GET_USER_PROFILE:
      return {
        ...state,
        userProfile: {
          ...action.data,
          picture: action.data.picture.data.url
        }
      };
    case actions.GET_USER_LIKES:
      return {
        ...state,
        userStatistics: {
          ...state.userStatistics,
          likes: _.object(_.map(_.pairs(action.data), (pair) => {
            return [
              _.convCamelCase(pair[0]),
              pair[1].data || pair[1]
            ];
          }))
        }
      };
    case actions.GET_USER_FRIENDS:
      return {
        ...state,
        userStatistics: {
          ...state.userStatistics,
          friends: {
            count: action.data.friends.summary.total_count
          },
          groups: action.data.groups.data
        }
      };
    default:
      return state;
  }
};

export default userReducer;
