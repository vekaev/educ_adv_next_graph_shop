import "dotenv/config";

import { list } from "@keystone-next/keystone";
import { cloudinaryImage } from "@keystone-next/cloudinary";
import { relationship, text } from "@keystone-next/keystone/fields";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  apiKey: process.env.CLOUDINARY_KEY!,
  apiSecret: process.env.CLOUDINARY_SECRET!,
  folder: "educ_adv_next_graph_shop",
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: "Source",
    }),
    altText: text(),
    product: relationship({ ref: "Product.photo" }),
  },
  ui: {
    listView: {
      initialColumns: ["image", "altText", "product"],
    },
  },
});
