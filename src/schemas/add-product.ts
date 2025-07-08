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
    .array(
      z.object({
        url: z.string().url({ message: "URL is not valid!" }),
      })
    )
    .nonempty({ message: "You must upload one image at least!" }),

  colors: z.array(
    z.object({
      name: z.string(),
      color: z.string(),
    }),
    {
      message: "you must select one color at least!",
    }
  ),

  quantity: z.coerce
    .number({ message: "quantity should enter numerical value >= 1" })
    .gte(1, {
      message: "quantity must be 1 at least!",
    })
    .default(1),

  tags: z.array(z.string(), { message: "you must select one tag at least!" }),
});
