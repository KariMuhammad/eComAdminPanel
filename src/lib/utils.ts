import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export function catchAsyncThunk<T>(asyncFn: () => Promise<T>): Promise<T> {
  return (async () => {
    try {
      return await asyncFn()
    } catch (error) {
      console.error('Async thunk error:', error)
      throw error
    }
  })()
}

// Utility function for handling token expiration in RTK Query
export const createBaseQueryWithAuth = (baseUrl: string) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      return headers
    },
  });

  return async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);

    // Handle token expiration
    if (result.error && result.error.status === 401) {
      // Import store and authActions dynamically to avoid circular dependencies
      const store = (await import('@/app/redux/store')).default;
      const { authActions } = await import('@/app/redux/features/auth');

      // Dispatch logout action
      store.dispatch(authActions.logout());

      // Show user-friendly message
      toast.error("Session expired. Please sign in again.");

      // Navigate to login page
      setTimeout(() => {
        window.location.href = "/auth/sign-in";
      }, 100);
    }

    return result;
  };
};