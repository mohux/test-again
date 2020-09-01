import { createContext } from 'react';
import { AuthProviderProps } from './provider';

export type RedirectConfig = {
   /** Where should the user be redirected to ? (default is /[lang]/login).*/
   redirectTo?: { href: string; as: string };
};
export type ComeBackConfig = {
   /** Where should the user be redirected to afer login success ? (default is /[lang]/login).*/
   comebackTo?: { href: string; as: string };
};
export type AuthContextProps = {
   /**
    * @description this will only make the user logged in by storing the token in the cookies
    * @param {string} token the token will be stored in cookies
    * @param {boolean} rememberMe if true, it will use "NEXT_PUBLIC_REMEMBER_TOKEN_COOKIES_AGE" inside .env files as cookie age,
    * @param {object} Initial user object
      if false, it will use "NEXT_PUBLIC_TOKEN_COOKIES_AGE" then
    */
   login: (token: string, rememberMe?: boolean, user?: Record<string, unknown>) => any;
   /** This will just logout the user and remove the token */
   logout: () => void;
   /** If you use it to store the user, then you will be able to access user object using useAuth hook */
   updateUser: (user: any) => any;
   /**
    * @description useful for buttons that require auth, it will take the user to login page and redirect him back to provided path on success
    */
   comebackLogin: (config?: RedirectConfig & ComeBackConfig) => any;
   settings: AuthProviderProps;
   authenticated: boolean;
   token: string;
   user: any;
};

const AuthContext = createContext<AuthContextProps>({
   updateUser: user => user,
   comebackLogin: () => {},
   authenticated: false,
   login: token => token,
   logout: () => {},
   settings: {},
   token: '',
   user: {},
});

export default AuthContext;
