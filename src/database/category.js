import { db } from '../firebase'

const getCategories = async () => {
    const category = []
    const querySnapshot = await db.collection('category').get()
    querySnapshot.forEach(function (doc) {
        category.push({
            id: doc.id,
            name: doc.data().name,
            editable: false,
            picture: doc.data().picture,
            banniere: doc.data().banniere,
        })
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
        await db.collection('category').doc(payload.id).update({
            name: payload.name,
            picture: payload.picture,
            banniere: payload.banniere,
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
const addCategory = async function (payload) {
    try {
        return await payload.ref.set({
            name: payload.name,
            picture: payload.picture,
            banniere: payload.banniere,
        })
    } catch (error) {
        console.log(error)
    }
}
const getCategorieById = async function (payload) {
    try {
        const result = await db.collection('category').doc(payload).get()
        return result
    } catch (error) {
        console.log(error)
    }
}
export {
    getCategories,
    deleteProductCategoryById,
    updateCategory,
    deleteCategory,
    deleteCategoryProductById,
    addCategory,
    getCategorieById,
}
