> Why when there is Axios Error thrown toast of success popup ?!

Looking at your code, I can see the issue! In your `add-product-layout.tsx`, you're using a try-catch block, but the `dispatch` calls for `createProduct` and `updateProduct` are likely throwing errors that aren't being caught properly.

The problem is that Redux Toolkit's `createAsyncThunk` actions return a promise that resolves even when the API call fails. You need to check the action result to see if it was fulfilled or rejected.

Here's the fix:

The issue was that Redux Toolkit's `createAsyncThunk` actions always resolve their promise, even when the API call fails. The action result contains information about whether it was fulfilled or rejected.

**What was happening:**
1. API call fails with axios error
2. Redux action resolves (not rejects) with `rejected` status
3. Your try-catch doesn't catch it because it's not a thrown error
4. Code continues to the success toast

**The fix:**
1. Check the action result using `createProduct.rejected.match(result)`
2. If rejected, throw an error to trigger the catch block
3. Use `toast.success()` and `toast.error()` for better UX
4. Include the actual error message in the toast

Now you'll get proper error handling and the success toast will only show when the API call actually succeeds!