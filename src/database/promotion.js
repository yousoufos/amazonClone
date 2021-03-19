import { db } from '../firebase'
import firebase from 'firebase/app'

const createPromotion = async function (payload) {
    try {
        const ref = db.collection('promotions').doc()
        await ref.set(payload)
        return { ...payload, promotionId: ref.id }
    } catch (error) {
        console.log(error)
    }
}

const getPromotions = async function () {
    try {
        const result = await db.collection('promotions').get()
        const tab = []
        result.forEach((doc) => {
            tab.push({
                promotionId: doc.id,
                name: doc.data().name,
                dateDebut: doc.data().dateDebut,
                dateFin: doc.data().dateFin,
                taux: doc.data().taux,
                productsList: doc.data().productsList,
            })
        })
        return tab
    } catch (error) {
        console.log(error)
    }
}
const getPromotionById = async function (payload) {
    try {
        const result = await db.collection('promotions').doc(payload).get()

        if (result.exists) {
            return { ...result.data(), promotionId: result.id }
        }
    } catch (error) {
        console.log(error)
    }
}

const deletePromotion = async function (payload) {
    try {
        console.log(payload)
        await db.collection('promotions').doc(payload).delete()
    } catch (error) {
        console.log(error)
    }
}

const updatePromotion = async function (payload) {
    try {
        await db.collection('promotions').doc(payload.promotionId).update({
            name: payload.name,
            dateDebut: payload.dateDebut,
            dateFin: payload.dateFin,
            taux: payload.taux,
            productsList: payload.productsList,
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    createPromotion,
    getPromotions,
    getPromotionById,
    deletePromotion,
    updatePromotion,
}
