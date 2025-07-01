import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstLastName(user: { name: string }) {
  const [firstName, lastName] = user.name.split(" ");
  return `${firstName[0]}${lastName[0]}`;
}