import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type GalleryPostData = {
  image: string;
  title: string;
  description: string;
  createdAt: number;
};

export type GalleryPostDocument = GalleryPostData & {
  id: string;
};

const postsCollection = collection(db, "posts");

export async function savePost(post: GalleryPostData) {
  await addDoc(postsCollection, post);
}

export async function fetchPosts() {
  const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(postsQuery);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as GalleryPostData;

    return {
      id: doc.id,
      image: data.image,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt
    };
  });
}

export function subscribeToPosts(
  onData: (posts: GalleryPostDocument[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));

  return onSnapshot(
    postsQuery,
    (snapshot) => {
      const mappedPosts = snapshot.docs.map((doc) => {
        const data = doc.data() as GalleryPostData;

        return {
          id: doc.id,
          image: data.image,
          title: data.title,
          description: data.description,
          createdAt: data.createdAt
        };
      });

      onData(mappedPosts);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    }
  );
}
