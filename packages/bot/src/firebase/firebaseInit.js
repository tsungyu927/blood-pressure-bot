var admin = require('firebase-admin')

var serviceAccount = require('../../blood-pressure-recorder-493d0-firebase-adminsdk-lkb20-c82ba941c3.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const getValueSync = async (refPath, isData) => {
  if (isData) {
    const doc = await db
      .collection('User')
      .doc(refPath)
      .collection('Data')
      .orderBy('DATE', 'desc')
      .limit(9)
      .get()
    return doc
  } else {
    const snapshot = await db.collection('User').doc(refPath).get()
    return snapshot.data()
  }
}

const setProfileSync = async (refPath, data) => {
  await db.collection('User').doc(refPath).set(data)
}

const setNewDataSync = async (userId, data) => {
  const time = admin.firestore.Timestamp.now()
  const target = await Object.assign(data, {
    DATE: time,
  })
  const check = await db
    .collection('User')
    .doc(userId)
    .collection('Data')
    .add(target)

  const returnData = Object.assign(target, { id: check.id })

  return returnData
}

module.exports = {
  db,
  getValueSync,
  setProfileSync,
  setNewDataSync,
}
