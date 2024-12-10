// Define LoginReturn interface
export interface LoginReturn {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    gender: string;
    role: string;
  };
}
