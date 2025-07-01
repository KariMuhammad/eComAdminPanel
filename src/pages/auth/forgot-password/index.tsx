export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Forgot your password?
      </h2>
      <p className="mb-6 text-center text-sm text-gray-600">
        Enter your email address and we’ll send you a link to reset your
        password.
      </p>
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
        >
          Send reset link
        </button>
      </form>
      <div className="mt-6 text-center">
        <a
          href="/auth/sign-in"
          className="text-sm text-primary hover:underline"
        >
          Back to login
        </a>
      </div>
    </div>
  );
}
