import { db } from '../firebase'

const getCategories = async () => {
  const category = []
  const querySnapshot = await db.collection('category').get()
  querySnapshot.forEach(function (doc) {
    category.push({ id: doc.id, name: doc.data().name })
  })

  return category
}

export { getCategories }
