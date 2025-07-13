import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string({ message: "name is required!" }).min(10, {
    message: "Name must has 10 characters at least!",
  }),

  description: z.string({ message: "description is required!" }).min(30, {
    message: "Description must has 30 characters at least!",
  }),

  price: z.coerce
    .number({ message: "price should enter numerical values > 0" })
    .gt(0, {
      message: "price must be greater than 0",
    }),

  category: z.string({
    message: "category is required!",
  }),

  brand: z.string({
    message: "brand is required!",
  }),

  images: z
    .array(z.string().url({ message: "URL is not valid!" }))
    .min(1, { message: "You must upload one image at least!" }),

  colors: z.array(
    z.object({
      name: z.string().nonempty({ message: "name is required!" }),
      hexCode: z.string().nonempty({ message: "hexCode is required!" }),
      quantity: z.coerce.number().gt(0),
    }),
    {
      message: "you must select one color at least!",
    }
  ),

  quantity: z.coerce
    .number({ message: "quantity should enter numerical value >= 1" })
    .gte(1, {
      message: "quantity must be 1 at least!",
    }),

  tags: z.array(z.string().nonempty({ message: "you must select one tag at least!" })).min(1, { message: "You must register one tag at least"})
});