import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import * as admin from 'firebase-admin';

// const request = require('request'); // HTTP Requests to external entities if needed

admin.initializeApp();

/* Cleanup task to remove member profiles from hard deleted accounts */
export const DeleteUserProfileOnAccountDeletion = functions.auth.user().onDelete((user: UserRecord) => {
  return admin.database().ref('/Users/' + user.uid).remove().then(
    () => {
      console.log('User Removed');

      //TODO: expand to delete the user's teams as well.
    },
    () => {
      console.log('User Removal Failed');
    }
  );
});

/* Enable/Disable user account if changed */
export const EnableDisableUser = functions.firestore.document('/users/{uid}').onWrite((change) => {

  // Pull User Data
  const after = change.after.data() || {};
  const before = change.before.data() || {};

  if (after.disabled !== before.disabled) {
    return admin.auth().updateUser(after.uid, { disabled: after.disabled });
  }

  return 'User was not affected.';
});

export const TeamsQuery = functions.firestore.document('/teams-query/{uid}').onCreate((snap) => {
  const db = admin.firestore();

  let userMemberships = db.collection('users').doc(snap.get('uid')).collection('user-teams').get();

  return userMemberships.then((querySnap) => {
    let listOfTeams = [];
    let membershipData = querySnap.docs.map((val) => {
      return val.data();
    }) || false;

    for (var i = 0; i < membershipData.length; i++) {
        
    }

  });
});
