/**
 * This common/shared interface is used in multiple slicers/reducers in redux.
 */

export interface CommonState {
  loading: boolean;
  error: null | string;
  message: null | string;
}

export interface Pagination {
  count: number;
  limit: number;
  page: number;
  prevPage: number | null;
  nextPage: number | null;
  totalCount: number;
}

export interface LoginSchema {
  email: string;
  password: string;
}

export interface RegisterSchema {
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}
