> may id is undefiend how to handle this

You need to handle the case where id might be undefined. Here are a few ways to fix this:
Option 1: Skip the query when id is undefined
The skip: !id option tells RTK Query to skip the API call when id is undefined or falsy. This is the recommended approach because:
id! - The non-null assertion operator tells TypeScript that id won't be undefined when the query actually runs
skip: !id - Prevents the query from running when id is undefined, so the non-null assertion is safe
Alternative approaches you could use:
The skip option is perfect for this use case since you only want to fetch the coupon data when you're in edit mode and have a valid ID.