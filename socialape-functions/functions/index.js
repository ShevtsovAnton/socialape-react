const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/FBAuth');
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
    getAuthenticatedUser
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
exports.api = functions.region('europe-west1').https.onRequest(app);