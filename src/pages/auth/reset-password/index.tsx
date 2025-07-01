import React from "react";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: Implement password reset logic here

    setSuccess(true);
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">Set New Password</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        {success && (
          <div className="text-sm text-green-600">
            Password reset successful!
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 font-semibold text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Reset Password
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
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
