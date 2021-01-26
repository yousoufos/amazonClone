import { auth, db } from '../firebase'

const register = async function (payload) {
  try {
    const authi = await auth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    )
    return authi
  } catch (error) {
    console.log(error)
  }
}

const login = async function (payload) {
  try {
    const authi = auth.signInWithEmailAndPassword(
      payload.email,
      payload.password
    )
    return authi
  } catch (error) {}
}

const updateUser = async function (userId, payload) {
  const entries = Object.entries(payload)
  const obj = {}
  entries.forEach(([key, val]) => {
    obj[key] = val
  })
  try {
    db.collection('users').doc(userId).update(obj)
  } catch (error) {
    console.log(error)
  }
}
const getUserById = function (userId) {
  try {
    const data = db.collection('users').doc(userId).get()
    return data
  } catch (error) {
    console.log(error)
  }
}
const getUsers = async function () {
  try {
    const tab = []
    const result = await db.collection('users').get()
    result.forEach((doc) => {
      tab.push({
        userId: doc.id,
        email: doc.data().email,
        nom: doc.data().nom,
        prenom: doc.data().prenom,
        adresse: doc.data().adresse,
        telephone: doc.data().telephone,
        role: doc.data().role,
        createdAt: doc.data().createdAt
      })
    })
    return tab
  } catch (error) {
    console.log(error)
  }
}
export { register, login, updateUser, getUserById, getUsers }
