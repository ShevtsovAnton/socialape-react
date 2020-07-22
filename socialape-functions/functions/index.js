const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/FBAuth');
const { db } = require('./util/admin');
const {
    getAllScreams,
    postOneScream,
    getScream,
    commentOnScream,
    likeScream,
    unLikeScream,
    deleteScream
} = require('./handlers/screams');
const {
    signUp,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead,
} = require('./handlers/users');

//Post routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unLikeScream);
app.delete('/scream/:screamId', FBAuth, deleteScream);

//Users routes
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.region('europe-west1').https.onRequest(app);

exports.createNotificationOnLike = functions
    .region('europe-west1')
    .firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        db.doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then(doc => {
                if (doc.exists) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        screamId: doc.id
                    });
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            })
    });

exports.createNotificationOnComment = functions
    .region('europe-west1')
    .firestore.document('comments/{id}')
    .onCreate((snapshot) => {
        db.doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        screamId: doc.id
                    });
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            })
    });

exports.deleteNotificationOnUnLike = functions
    .region('europe-west1')
    .firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            })

    })