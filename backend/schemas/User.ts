import { list } from "@keystone-next/keystone";
import { text, password } from "@keystone-next/keystone/fields";

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    password: password(),
  },
});
