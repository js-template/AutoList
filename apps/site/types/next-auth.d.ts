import { type DefaultSession } from "next-auth";

declare module "@auth/core" {
   interface Session {
      user: {
         /** The user's postal address. */
         id: string;
         username: string;
         email: string;
         provider: string;
         password: string;
         resetPasswordToken: string;
         confirmationToken: string;
         confirmed: boolean;
         blocked: boolean;
         role: string;
         created_by: string;
         updated_by: string;
         created_at: any;
         updated_at: any;
         jwtToken: string;
         membership: {
            id: string;
            title: string;
            description: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            price: number;
            frequency: string;
            create_ads_limit: number;
            ads_boost_limit: number;
            feature: {
               id: number;
               key: string;
               value: string;
            }[];
         };
         // By default, TypeScript merges new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above. To keep the default session user properties, you need to add them back into the newly declared interface
      } & DefaultSession["user"]; // To keep the default types
   }

   interface User {
      id: string;
      username: string;
      email: string;
      provider: string;
      password: string;
      resetPasswordToken: string;
      confirmationToken: string;
      confirmed: boolean;
      blocked: boolean;
      role: string;
      created_by: string;
      updated_by: string;
      created_at: any;
      updated_at: any;
      jwtToken: string;
      membership: {
         id: string;
         title: string;
         description: string;
         createdAt: string;
         updatedAt: string;
         publishedAt: string;
         price: number;
         frequency: string;
         create_ads_limit: number;
         ads_boost_limit: number;
         feature: {
            id: number;
            key: string;
            value: string;
         }[];
      };
   }
}

declare module "next-auth" {
   interface Session {
      user: {
         /** The user's postal address. */
         id: string;
         username: string;
         email: string;
         provider: string;
         password: string;
         resetPasswordToken: string;
         confirmationToken: string;
         confirmed: boolean;
         blocked: boolean;
         role: string;
         created_by: string;
         updated_by: string;
         created_at: any;
         updated_at: any;
         jwtToken: string;
         membership: {
            id: string;
            title: string;
            description: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            price: number;
            frequency: string;
            create_ads_limit: number;
            ads_boost_limit: number;
            feature: {
               id: number;
               key: string;
               value: string;
            }[];
         };
         // By default, TypeScript merges new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above. To keep the default session user properties, you need to add them back into the newly declared interface
      } & DefaultSession["user"]; // To keep the default types
   }

   interface User {
      id: string;
      username: string;
      email: string;
      provider: string;
      password: string;
      resetPasswordToken: string;
      confirmationToken: string;
      confirmed: boolean;
      blocked: boolean;
      role: string;
      created_by: string;
      updated_by: string;
      created_at: any;
      updated_at: any;
      jwtToken: string;
      membership: {
         id: string;
         title: string;
         description: string;
         createdAt: string;
         updatedAt: string;
         publishedAt: string;
         price: number;
         frequency: string;
         create_ads_limit: number;
         ads_boost_limit: number;
         feature: {
            id: number;
            key: string;
            value: string;
         }[];
      };
   }
}

declare module "@auth/core/jwt" {
   /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
   interface JWT {
      id: string;
      username: string;
      email: string;
      provider: string;
      password: string;
      resetPasswordToken: string;
      confirmationToken: string;
      confirmed: boolean;
      blocked: boolean;
      role: string;
      created_by: string;
      updated_by: string;
      created_at: any;
      updated_at: any;
      jwtToken: string;
      membership: {
         id: string;
         title: string;
         description: string;
         createdAt: string;
         updatedAt: string;
         publishedAt: string;
         price: number;
         frequency: string;
         create_ads_limit: number;
         ads_boost_limit: number;
         feature: {
            id: number;
            key: string;
            value: string;
         }[];
      };
   }
}
