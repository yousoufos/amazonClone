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
  try {
    db.collection('users').doc(userId).update({
      nom: payload.nom,
      prenom: payload.prenom,
      telephone: payload.telephone,
      adresse: payload.adresse
    })
  } catch (error) {
    console.log(error)
  }
}

export { register, login, updateUser }
