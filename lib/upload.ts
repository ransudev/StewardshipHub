import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function uploadImage(file: File) {
  const fileExtension = file.name.split(".").pop();
  const fileName = `${uuidv4()}${fileExtension ? `.${fileExtension}` : ""}`;
  const storageRef = ref(storage, `posts/${fileName}`);

  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);

  return downloadUrl;
}
