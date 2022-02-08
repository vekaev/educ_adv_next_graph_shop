import "dotenv/config";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";

import { config } from "@keystone-next/keystone";
import { statelessSessions } from "@keystone-next/keystone/session";
import { createAuth } from "@keystone-next/auth";

import { insertSeedData } from "./seed-data";

import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";

const dataBaseUrl = process.env.DATABASE_URL || "file:./dev.db";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.COOKIE_SECRET!,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
  // sessionData: `id name email role { ${permissionsList.join(" ")} }`,
  // passwordResetLink: {
  //   async sendToken(args) {
  //     // send the email
  //     await sendPasswordResetEmail(args.token, args.identity);
  //   },
  // },
});

export default withAuth(
  config({
    lists: {
      User,
      Product,
      ProductImage,
    },
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL!],
        credentials: true,
      },
    },
    db: {
      provider: "sqlite",
      url: dataBaseUrl,
      async onConnect(context) {
        console.log("Connected to the database!");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context.prisma);
        }
      },
    },
    graphql: {
      apolloConfig: {
        plugins: [
          process.env.NODE_ENV === "production"
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
      },
    },
    ui: {
      // Change this for roles}
      isAccessAllowed: ({ session }) => {
        return !!session;
      },
    },
    session: statelessSessions(sessionConfig),
  })
);
