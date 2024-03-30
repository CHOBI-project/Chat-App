import { Message, User } from "./types";

/**
 * Jsonファイルにユーザー情報を追加する
 * @param {User} user { id: string, pass: string }のユーザー情報
 */
export const addUser = async (user: User): Promise<void> => {
    const res = await fetch('http://localhost:3001/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    res.json();
};


/**
 * app.jsonの情報を取得する
 * @return app.jsonの情報を返す
 * @see {@link ./src/data/app.json}
 */
export const getUser = async (): Promise<User[]> => {
    const res  = await fetch('http://localhost:3001/users');
    const usersData = await res.json();
    // console.log(data);

    return usersData;
};


/**
 * Jsonファイルにメッセージを保存する
 * @param {Message} message { id: string, text: string, time: string }のユーザー情報
 */
export const addMessage = async (message: Message): Promise<void> => {
    const res = await fetch('http://localhost:3001/messages', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
    res.json();
};


/**
 * app.jsonの情報を取得する
 * @return app.jsonの情報を返す
 * @see {@link ./src/data/app.json}
 */
export const getMessage = async (): Promise<Message[]> => {
    const res = await fetch('http://localhost:3001/messages');
    const messageData = await res.json();
    console.log(messageData);

    return messageData;
}