import { React, useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addMessage, deleteMessage } from "./store/reducers/MessageReducer";

import { generateId } from "./utils";

const App = () => {
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();
    const msgs = useSelector(state => state.messages);

    // Computed value
    const groupMessages = () => {
        const msgEls = [];
        let group = [];
        let currIs = msgs[0].is;
        for (let msg of msgs) {
            if (msg.is !== currIs) {
                msgEls.push({id: generateId(), is: currIs, msgs: group});
                group = [];
                currIs = msg.is;
            }
            group.push(msg);
        }
        msgEls.push({id: generateId(), is: currIs, msgs: group});
        return msgEls;
    };

    const msgEls = useMemo(groupMessages, [msgs]);

    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [msgs]);

    const onSend = (e) => {
        e.preventDefault();
        if (msg) {
            setMsg('');
            dispatch(addMessage(msg));
        }
    };

    const onDelete = (/** @type {number} */ id) => {
        dispatch(deleteMessage(id));
    };

    const onChange = (e) => {
        setMsg(e.target.value);
    };

    const getTime = (isoDate) => {
        const date = new Date(Date.parse(isoDate));
        return `${date.getHours()}:${date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()}`;
    };

    return (
        <div className="App">
            <div className="messages-area" ref={containerRef}>
                {
                    msgEls.map(group =>
                        <div className={group.is === 'my' ? "message-group my" : "message-group"} key={group.id}>
                            {
                                group.msgs.map(msg => {
                                    if (msg.is === 'my') {
                                        return <div className="message my" key={msg.id}>
                                            <div className="message__delete" onClick={() => onDelete(msg.id)} />
                                            <span className="message__time">{getTime(msg.date)}</span>
                                            <p className="message__text">{msg.message}</p>
                                            <img className="message__avatar" src={msg.avatar} alt="User avatar" />
                                        </div>
                                    }
                                    return (
                                        <div className="message" key={msg.id}>
                                            <img className="message__avatar" src={msg.avatar} alt="User avatar" />
                                            <p className="message__text">{msg.message}</p>
                                            <span className="message__time">{getTime(msg.date)}</span>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>
            <form>
                <input
                    type="text"
                    placeholder="Write some message..."
                    value={msg}
                    onChange={onChange}
                />
                <button
                    type="submit"
                    onClick={onSend}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default App;
