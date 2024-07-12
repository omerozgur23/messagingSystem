export class SendMessageRequest {
    constructor(
        public recipientUser: string,
        public messageContent: string
    ) {}
}