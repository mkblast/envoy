export type User = {
    _id: string,
    first_name: string,
    last_name: string,
}

export type Message = {
    _id: string,
    body: string,
    author: User,
    reciever: User,
    date: string,
}

export type InputError = {
    path: string,
    msg: string,
}
