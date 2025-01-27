import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginData = { email, password };

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed ");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      Cookies.set("email", email, { expires: 1 });
      router.push("/blog");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-work-sans">
      {error && <div className="text-red-500">{error}</div>}

      <div className="font-work-sans">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition duration-300"
      >
        {loading ? "Logging In..." : "Log In"}
      </button>
    </form>
  );
}
