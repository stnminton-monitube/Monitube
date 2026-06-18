import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg)" }}>
      <SignIn />
    </main>
  );
}
