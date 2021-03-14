import { generateId } from "../../utils";

export const MESSAGES_ADD = 'MESSAGES/ADD';
export const MESSAGES_DELETE = 'MESSAGES/DELETE';

/**
 * @typedef {Object} Message
 * @property {string} avatar,
 * @property {string} message,
 * @property {number} id,
 * @property {string} date,
 * @property {string} is
 */

/**
 * @typedef {Object} AddAction
 * @property {string} type
 * @property {string} payload
 */

/**
 * @typedef {Object} DeleteAction
 * @property {string} type
 * @property {number} payload
 */

/**
 * @param {string} payload
 * @return {AddAction}
 */
export const addMessage = (payload) => {
    return {
        type: MESSAGES_ADD,
        payload
    };
};

/**
 * @param {number} payload
 * @return {DeleteAction}
 */
export const deleteMessage = (payload) => {
    return {
        type: MESSAGES_DELETE,
        payload
    };
};

const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case MESSAGES_ADD:
            return [...state, /** @type Message */ {
                avatar: "https://sun9-58.userapi.com/c836638/v836638514/867c/SPMigNB8gw0.jpg",
                message: action.payload,
                id: generateId(),
                date: (new Date()).toISOString(), // @todo Use more accurate id generation
                is: "my",
            }];
        case MESSAGES_DELETE:
            return state.filter(message => message.id !== action.payload);
        default:
            return state;
    }
};

export { messagesReducer };
