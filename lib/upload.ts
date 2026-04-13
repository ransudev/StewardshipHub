export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "stewardshiphub");

  const response = await fetch("https://api.cloudinary.com/v1_1/dypgq25xq/image/upload", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.error?.message ?? "Cloudinary upload failed";
    throw new Error(message);
  }

  const data = (await response.json()) as { secure_url?: string };

  if (!data.secure_url) {
    throw new Error("Cloudinary did not return a secure URL");
  }

  return data.secure_url;
}
