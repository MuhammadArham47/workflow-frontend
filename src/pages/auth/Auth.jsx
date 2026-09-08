import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import {
  Workflow,
  Zap,
  KanbanSquare,
  Users,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building2,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Sparkles,
} from "lucide-react";
import { userAuth } from "../../context/Auths";
import { useNavigate } from "react-router-dom";
import { initTheme } from "../../utils/theme";
// import "../../styles/theme.css";


const ROLES = ["Owner", "Admin", "Member", "Viewer"];

const MOCK_USERS = [
  {
    name: "Alex Carter",
    email: "alex@workflow.pro",
    role: "Workspace Owner",
    initials: "AC",
    gradient: "from-indigo-500 to-purple-500",
    badge: "Owner",
  },
  {
    name: "Sarah Kim",
    email: "sarah@workflow.pro",
    role: "Project Admin",
    initials: "SK",
    gradient: "from-fuchsia-500 to-pink-500",
    badge: "Admin",
  },
  {
    name: "John Doe",
    email: "john@workflow.pro",
    role: "Viewer",
    initials: "JD",
    gradient: "from-cyan-500 to-blue-500",
    badge: "Viewer",
  },
  {
    name: "Maya Patel",
    email: "maya@workflow.pro",
    role: "Member",
    initials: "MP",
    gradient: "from-emerald-500 to-teal-500",
    badge: "Member",
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Offline-first speed",
    text: "Client-side persistence & instant load times, even on flaky networks.",
  },
  {
    icon: KanbanSquare,
    title: "Any view your team loves",
    text: "Dynamic Kanban, Table, and Calendar views — switch with one click.",
  },
  {
    icon: Users,
    title: "Real-time teamwork",
    text: "Simulated live activity feed and granular role management built in.",
  },
];

function AuthPage() {
  const [mode, setMode] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Owner");
  const [workspace, setWorkspace] = useState("My Workspace");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { loginUser, registerUser } = userAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage se "wf-theme" parh kar light/dark apply karta hai
    initTheme();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("wf-remember");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setEmail(data.email);
        setRememberMe(true);
      } catch {
        localStorage.removeItem("wf-remember");
      }
    }
  }, []);

  const validate = () => {
    const next = {};
    if (mode === "signup" && !name.trim()) next["name"] = "Full name is required";
    if (!email.trim()) next["email"] = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next["email"] = "Enter a valid email address";
    if (!password) next["password"] = "Password is required";
    else if (password.length < 6) next["password"] = "Password must be at least 6 characters";
    if (mode === "signup" && !workspace.trim()) next["workspace"] = "Workspace name is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const simulateLogin = (displayName) => {
    setLoading(true);
    if (rememberMe) {
      localStorage.setItem("wf-remember", JSON.stringify({ email }));
    } else {
      localStorage.removeItem("wf-remember");
    }
    setTimeout(() => {
      setLoading(false);
      toast.success(`Logged in as ${displayName}`, {
        description: "Logged in successfully! Redirecting to Workspace...",
        icon: <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />,
      });
    }, 1400);
  };

/**
 * 处理表单提交事件的函数
 * @param {Object} e - 事件对象
 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;
    console.log(mode);
    if (mode === "signup") {
      if (!name || !email || !password) {
        toast.error("Email and password are required");
        return;
      }
      const datas = {name, email, password};
      const res = await registerUser(datas);

      if (res.success) {
        toast.success("Registered successfully!");
        setMode('login');
      };
    } else if (mode === "login") {
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }
        const data = {email, password};
        const res = await loginUser(data);

        if (res.success) {
          toast.success("Login successful");
          if (res.data.name === "admin") {
            navigate("/dashboard/adminDashboard");
          } else {
            navigate("/dashboard/userDashboard")
          }
        };
    }
    // simulateLogin(mode === "signup" ? name : email.split("@").at(0) ?? "Demo User");
  };

  const handleDemoLogin = (user) => {
    setEmail(user.email);
    setPassword("demo1234");
    setName(user.name);
    setErrors({});
    simulateLogin(user.name);
    navigate('/dashboard/adminDashboard')
  };

  const switchMode = (m) => {
    setMode(m);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] transition-colors duration-300">
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            backdropFilter: "blur(12px)",
          },
        }}
      />
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--blur-accent-1)] blur-3xl" />
          <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[var(--blur-accent-2)] blur-3xl" />
          <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[var(--blur-accent-3)] blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-6 flex items-center justify-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent-from)] to-[var(--color-accent-to)] shadow-lg shadow-[var(--shadow-accent)]">
              <Workflow className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">WorkFlow Pro</span>
          </div>

          <h1 className="text-center text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
            Supercharge your team's workspace with{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent-light-from)] to-[var(--color-accent-light-to)] bg-clip-text text-transparent">
              offline-first speed.
            </span>
          </h1>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-feature)] px-2 py-3 text-center backdrop-blur transition-all duration-300 hover:border-[var(--color-border-hover)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border-strong)] bg-[var(--blur-accent-3)] text-[var(--color-accent-text)] shadow-[0_0_16px_var(--blur-accent-1)] transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-4 w-4" />
                </div>
                <p className="text-[11px] font-medium leading-tight text-[var(--color-text-secondary)]">{f.title}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 shadow-2xl shadow-[var(--shadow-accent-strong)] backdrop-blur-xl sm:p-8">
            <div className="grid grid-cols-3 gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] p-1">
              {[
                { id: "signup", label: "Sign Up" },
                { id: "login", label: "Log In" },
                { id: "demo", label: "Demo" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchMode(tab.id)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    mode === tab.id
                      ? "bg-gradient-to-r from-[var(--color-accent-from)] to-[var(--color-accent-to)] text-white shadow-lg shadow-[var(--shadow-accent)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight">
              {mode === "signup" && "Create your workspace"}
              {mode === "login" && "Welcome back"}
              {mode === "demo" && "Fast Hackathon Demo Login"}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {mode === "signup" && "Set up your account and launch in seconds."}
              {mode === "login" && "Log in to continue to your workspace."}
              {mode === "demo" && "One click — pick a mock user and jump right in."}
            </p>

            {mode === "demo" ? (
              <div className="mt-6 space-y-3">
                {MOCK_USERS.map((u) => (
                  <button
                    key={u.email}
                    type="button"
                    disabled={loading}
                    onClick={() => handleDemoLogin(u)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:shadow-lg hover:shadow-[var(--blur-accent-1)] disabled:opacity-60"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${u.gradient} text-xs font-bold text-white transition-transform duration-300 group-hover:scale-110`}
                    >
                      {u.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{u.name}</p>
                      <p className="truncate text-xs text-[var(--color-text-muted)]">{u.role}</p>
                    </div>
                    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                      {u.badge}
                    </span>
                    <Sparkles className="h-4 w-4 shrink-0 text-[var(--color-accent-text)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                ))}
                <p className="pt-2 text-center text-xs text-[var(--color-text-faint)]">
                  Clicking a card auto-fills credentials and logs in instantly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                {mode === "signup" && (
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-[var(--color-text-secondary)]">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-faint)]" />
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] py-2.5 pl-10 pr-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-faint)] outline-none transition-all duration-200 focus:border-[var(--color-accent-solid)] focus:ring-2 focus:ring-[var(--blur-accent-3)]"
                      />
                    </div>
                    {errors["name"] && <p className="mt-1 text-xs text-[var(--color-danger)]">{errors["name"]}</p>}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[var(--color-text-secondary)]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-faint)]" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] py-2.5 pl-10 pr-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-faint)] outline-none transition-all duration-200 focus:border-[var(--color-accent-solid)] focus:ring-2 focus:ring-[var(--blur-accent-3)]"
                    />
                  </div>
                  {errors["email"] && <p className="mt-1 text-xs text-[var(--color-danger)]">{errors["email"]}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-[var(--color-text-secondary)]">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-faint)]" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] py-2.5 pl-10 pr-10 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-faint)] outline-none transition-all duration-200 focus:border-[var(--color-accent-solid)] focus:ring-2 focus:ring-[var(--blur-accent-3)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-secondary)]"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors["password"] && <p className="mt-1 text-xs text-[var(--color-danger)]">{errors["password"]}</p>}
                </div>

                {mode === "signup" && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-secondary)]">
                        Initial Role
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {ROLES.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`rounded-lg border px-2 py-2 text-xs font-medium transition-all duration-200 ${
                              role === r
                                ? "border-[var(--color-border-strong)] bg-[var(--blur-accent-3)] text-[var(--color-accent-text)] shadow-[0_0_16px_var(--blur-accent-1)]"
                                : "border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:border-[var(--color-border-muted)] hover:text-[var(--color-text-secondary)]"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="workspace" className="mb-1.5 block text-xs font-medium text-[var(--color-text-secondary)]">
                        Workspace Name
                      </label>
                      <div className="relative">
                        <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-faint)]" />
                        <input
                          id="workspace"
                          type="text"
                          value={workspace}
                          onChange={(e) => setWorkspace(e.target.value)}
                          placeholder="My Workspace"
                          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] py-2.5 pl-10 pr-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-faint)] outline-none transition-all duration-200 focus:border-[var(--color-accent-solid)] focus:ring-2 focus:ring-[var(--blur-accent-3)]"
                        />
                      </div>
                      {errors["workspace"] && (
                        <p className="mt-1 text-xs text-[var(--color-danger)]">{errors["workspace"]}</p>
                      )}
                    </div>
                  </>
                )}

                {mode === "login" && (
                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-[var(--color-text-muted)]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border-[var(--color-border-muted)] bg-[var(--color-bg-secondary)] accent-[var(--color-accent-solid)]"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="text-xs font-medium text-[var(--color-accent-text)] transition-colors hover:text-[var(--color-accent-light-from)]"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[var(--color-accent-from)] to-[var(--color-accent-to)] py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--shadow-accent)] transition-all duration-300 hover:shadow-xl hover:shadow-[var(--shadow-accent-strong)] hover:brightness-110 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : mode === "signup" ? (
                    `Create Account & Launch Workspace`
                  ) : (
                    "Log In"
                  )}
                </button>

                {mode === "signup" && (
                  <p className="text-center text-xs text-[var(--color-text-faint)]">
                    You'll join as <span className="font-medium text-[var(--color-accent-text)]">{role}</span> of{" "}
                    <span className="font-medium text-[var(--color-text-secondary)]">{workspace || "My Workspace"}</span>.
                  </p>
                )}
              </form>
            )}

            {mode !== "demo" && (
              <div className="mt-5 border-t border-[var(--color-border)] pt-4 text-center">
                <button
                  type="button"
                  onClick={() => switchMode("demo")}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent-text)]"
                >
                  <Zap className="h-3.5 w-3.5 text-[var(--color-accent-text)]" />
                  Just browsing? Try the Fast Demo Login
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-[var(--color-text-footer)]">
            Simulated authentication — no data leaves your browser.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;