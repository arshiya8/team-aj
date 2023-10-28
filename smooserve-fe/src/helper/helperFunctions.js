import { collection, query, where, getDocs, limit, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/firebase";

export async function getDocumentIdByEmail(email, collectionName, purpose) {
  const q = query(
    collection(db, collectionName),
    where("email", "==", email),
    limit(1)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Get the first document (if there are multiple matching)
    const doc = querySnapshot.docs[0];
    if (purpose == "id") {
      // Access the document ID
      return doc.id;
    } else if (purpose == "view") {
        updateViewCount(doc.id)
      
    } else {
      return doc.data();
    }
  } else {
    // No matching document found
    return null;
  }
}
// Function to update the view count for the document
async function updateViewCount(documentId) {
    const docRef = doc(db, "CSPs", documentId); // Replace "your_collection_name" with the actual collection name
  
    try {
      // Increment the "views" field by 1
      await updateDoc(docRef, {
        views: increment(1),
      });
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }

  