import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"
import { getStorage } from "firebase-admin/storage"

// Initialize Firebase Admin SDK
const apps = getApps()

if (!apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}")

  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
}

// Export Firestore
export const db = getFirestore()

// Export Auth
export const auth = getAuth()

// Export Storage
export const storage = getStorage()

// Helper function to convert Firestore timestamps to ISO strings
export const convertTimestamps = (doc: any) => {
  const data = doc.data()

  // Convert all timestamp fields to ISO strings
  Object.keys(data).forEach((key) => {
    if (data[key] && typeof data[key].toDate === "function") {
      data[key] = data[key].toDate().toISOString()
    }
  })

  return {
    id: doc.id,
    ...data,
  }
}

// Helper function to handle Firestore batch operations
export const runBatch = async (operations: Array<() => Promise<void>>) => {
  const batch = db.batch()
  const results = []

  for (const operation of operations) {
    results.push(await operation())
  }

  await batch.commit()
  return results
}

