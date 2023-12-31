import { ref } from "vue"
import { db } from "@/firebase/config"
import { collection as fbCollection, addDoc as fbAddDoc, onSnapshot } from "firebase/firestore"

export function useCollection(collectonName) {
	//fixme remove any
	const documents = ref<any>([])
	const loading = ref(false)
	const error = ref<string | null>(null)

	const collectionRef = fbCollection(db, collectonName)
	onSnapshot(collectionRef, (snap) => {
		let results = []
		snap.docs.forEach((doc) => {
			doc.data().createdAt && results.push({
				...doc.data(),
				id: doc.id
			})
		})
		documents.value = results
		error.value = null
	}, (e) => {
		error.value = e.message
	})

	const addDoc = async (doc) => {
		loading.value = true
		error.value = null

		try {
			fbAddDoc(collectionRef, doc)
			loading.value = false
		} catch (e) {
			documents.value = null
			error.value = e.message
			loading.value = false
		}
	}

	return {
		documents,
		loading,
		error,
		addDoc
	}
}
