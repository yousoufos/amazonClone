import { auth } from '../firebase'

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

export { register, login }
