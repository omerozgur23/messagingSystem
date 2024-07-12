export interface GetMessageResponse{
    count: number,
    data: [
        {
            id: string,
            senderUsername: string,
            messageContent: string,
            sendingDate: string,
            isReaded: boolean,
        }
    ]
}