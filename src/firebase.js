const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({origin: true}));

exports.createUser = functions.https.onCall(async (data, context) => {
  const {name, email, department} = data;

  try {
    const newUser = await admin.firestore().collection("users").add({
      name,
      email,
      department,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {userId: newUser.id};
  } catch (error) {
    throw new functions.https.HttpsError("internal", "user not created", error);
  }
});

exports.draftPublished = functions.database.ref("/Maintodo/{tempUuid}")
    .onUpdate((snapshot, context) => {
      const articleId = context.params.tempUuid;
      console.log(`A new article has been published, Id:${articleId} `);
      const articleContent = snapshot.val();
      console.log(` ${articleId} has content: ${articleContent}`);
    });

exports.onUpdateFunction = functions.database.ref('Maintodo/{dataId}').onUpdate((change, context) => {
      // Get the updated data and previous data
      const updatedData = change.after.val();
      const previousData = change.before.val();
    
      // Get the data ID from the context
      const dataId = context.params.dataId;
      
      // Update the data in the database
      const database = admin.database();
      const ref = database.ref(`Maintodo/{dataId}`);
    
      ref.set({
        update: updatedData.update ? previousData.update : 0
      })
        .then(() => {
          console.log(`Data ${dataId} updated successfully.`);
        })
        .catch((error) => {
          console.error(`Error updating data ${dataId}:`, error);
        });
    });