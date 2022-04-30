const createRequest = (id: string) => {
    const formData = new FormData()
    formData.append('actionName', 'MessagesLoad')
    formData.append('messageId', id)
    const requestOptions = {
        method: 'POST',
        body: formData,
    };
    return requestOptions
}

export const messageApi = {

    getMessages() {
       return fetch("http://f0665380.xsph.ru/", createRequest('0'))
    },
    getNewMessages(id: string) {
       return fetch("http://f0665380.xsph.ru/", createRequest(id ))
    }
}




export type MessagesResponseType = {
    author: string
    content: string
    channel: string
    date: string
    id: string
    attachments: AttachmentsType[]
    senderNumber: string
    region: string
    isFavorites: boolean
}

export type AttachmentsType = {
    type: string
    url: string
}