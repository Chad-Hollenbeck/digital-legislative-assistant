import * as functions from 'firebase-functions';
import {UserRecord} from 'firebase-functions/lib/providers/auth';
import * as admin from 'firebase-admin';

// const request = require('request'); // HTTP Requests to external entities if needed

admin.initializeApp();

/* Cleanup task to remove member profiles from hard deleted accounts */
export const DeleteUserProfileOnAccountDeletion = functions.auth.user().onDelete((user: UserRecord, context) => {
  return admin.database().ref('/Users/' + user.uid).remove().then(
    () => {
      console.log('User Removed');
    },
    () => {
      console.log('User Removal Failed');
    }
  );
});

/* Enable/Disable user account if changed */
export const EnableDisableUser = functions.database.ref('/Users/{uid}').onWrite((snapshot, context) => {

  // Pull User Data
  const after = snapshot.after.val();
  const before = snapshot.before.val();

  if (after.disabled !== before.disabled) {
    return admin.auth().updateUser(after.uid, {disabled: after.disabled});
  }

  return 'User was not enabled/disabled.';
});
