let db = {
    users: [
        {
            userId: '',
            email: 'email.com',
            handle: 'user',
            createdAt: '2020-07-18T16:12:31.150Z',
            imageUrl: '',
            bio: 'Hello, my name is...',
            website: '',
            location: 'Kyiv, UA'
        }

    ],
    screams: [
        {
            userHandle: 'user',
            body: 'this is the scream body',
            createdAt: '2020-07-18T16:12:31.150Z',
            likeCount: 5,
            commentCount: 2
        }
    ],
    comments: [
        {
            userHandle: '',
            screamId: '',
            body: '',
            createdAt: ''
        }
    ]
}
const userDetails ={
    //Redux data
    credentials: {
        userId: '',
        email: '',
        handle: '',
        createdAt: '',
        imageUrl: '',
        bio: '',
        website: '',
        location: '',
    },
    likes: [
        {
            userHandle: '',
            screamId: ''
        },
        {
            userHandle: '',
            screamId: ''
        }
    ]
}