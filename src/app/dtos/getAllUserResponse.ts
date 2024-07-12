export interface GetAllUserResponse{
    count: number,
    data: [
        {
            id: string,
            username: string
            email: string,
        }
    ]
}