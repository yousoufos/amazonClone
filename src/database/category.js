import { db } from '../firebase'

const getCategories = async () => {
  const category = []
  const querySnapshot = await db.collection('category').get()
  querySnapshot.forEach(function (doc) {
    category.push({ id: doc.id, name: doc.data().name, editable: false })
  })

  return category
}

const deleteProductCategoryById = async function (productId) {
  try {
    const productCategory = await db
      .collection('productCategory')
      .where('productId', '==', productId)
    productCategory.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete()
      })
    })
  } catch (error) {
    console.log(error)
  }
}
const deleteCategoryProductById = async function (categoryId) {
  try {
    const productCategory = await db
      .collection('productCategory')
      .where('categoryId', '==', categoryId)
    productCategory.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete()
      })
    })
  } catch (error) {
    console.log(error)
  }
}
const updateCategory = async function (payload) {
  try {
    await db.collection('category').doc(payload.categoryId).update({
      name: payload.name
    })
  } catch (error) {
    console.log(error)
  }
}
const deleteCategory = async function (payload) {
  try {
    await db.collection('category').doc(payload).delete()
    await deleteCategoryProductById(payload)
  } catch (error) {
    console.log(error)
  }
}
export {
  getCategories,
  deleteProductCategoryById,
  updateCategory,
  deleteCategory,
  deleteCategoryProductById
}
