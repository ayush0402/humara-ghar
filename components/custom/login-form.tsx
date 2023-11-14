import Messages from "@/components/custom/message";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/api/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button className="rounded-md px-4 py-2 mb-2">Sign In</Button>
        <Button
          formAction="/api/auth/sign-up"
          variant="secondary"
          className="border border-foreground/20 rounded-md px-4 py-2 mb-2"
        >
          Sign Up
        </Button>
        <Messages />
      </form>
    </div>
  );
}
