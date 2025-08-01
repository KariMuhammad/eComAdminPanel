import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstLastName(name: string) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[0]}`;
}

export function getUsername(first_name: string, last_name: string) {
  return `${first_name} ${last_name}`;
}

// Function to convert image URL to File object
export const convertUrlToFile = async (imageUrl: string, filename: string): Promise<File> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error('Error converting URL to File:', error);
    // Return a placeholder file if conversion fails
    return new File([''], filename, { type: 'image/jpeg' });
  }
};

// Function to convert multiple image URLs to File objects
export const convertUrlsToFiles = async (imageUrls: string[]): Promise<File[]> => {
  const filePromises = imageUrls.map((url, index) =>
    convertUrlToFile(url, `image-${index + 1}.jpg`)
  );
  return Promise.all(filePromises);
};

export const catchAsyncThunk = (asyncCallback: () => Promise<any>): Promise<any> => {
  return asyncCallback().then((data: any) => data).catch((error: unknown) => {
    return Promise.reject(
      error instanceof Error ? error.message : "Failed to handle operation on products!"
    );
  })
}