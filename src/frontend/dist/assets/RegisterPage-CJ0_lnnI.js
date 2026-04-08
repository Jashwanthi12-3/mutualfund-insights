import { c as createLucideIcon, e as useBackend, f as useQueryClient, b as useNavigate, r as reactExports, U as UserRole, j as jsxRuntimeExports, d as Button, T as TrendingUp, g as ue } from "./index-BqQuEjuM.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-PAhuKvDj.js";
import { I as Input } from "./input-Cl8bTwgy.js";
import { L as Label } from "./label-B5geBl3E.js";
import { u as useMutation } from "./useMutation-_zBYk2MD.js";
import { U as User } from "./user-BQu-mowt.js";
import { S as ShieldCheck, C as ChartColumn } from "./shield-check-BfbCzkUq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode);
const roleOptions = [
  {
    value: UserRole.Investor,
    label: "Investor",
    description: "Browse funds, compare performance, and plan investments",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" })
  },
  {
    value: UserRole.FinancialAdvisor,
    label: "Financial Advisor",
    description: "Access advisor tools, share insights, and assist clients",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5" })
  },
  {
    value: UserRole.DataAnalyst,
    label: "Data Analyst",
    description: "Analyze fund data, generate insights and trend reports",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5" })
  }
];
const roleColors = {
  [UserRole.Investor]: "border-primary/50 bg-primary/5 text-primary",
  [UserRole.FinancialAdvisor]: "border-accent/50 bg-accent/5 text-accent",
  [UserRole.DataAnalyst]: "border-warning/50 bg-warning/5 text-warning-foreground",
  [UserRole.Admin]: "border-destructive/50 bg-destructive/5 text-destructive"
};
function RegisterPage() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [selectedRole, setSelectedRole] = reactExports.useState(UserRole.Investor);
  const [nameError, setNameError] = reactExports.useState("");
  const [emailError, setEmailError] = reactExports.useState("");
  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.registerUser({
        name: name.trim(),
        email: email.trim(),
        role: selectedRole
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerUser"] });
      ue.success("Profile created! Welcome to MutualFunds.");
      navigate({ to: "/dashboard" });
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "Registration failed. Please try again.";
      ue.error(message);
    }
  });
  function validateAndSubmit(e) {
    e.preventDefault();
    let valid = true;
    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    } else if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      valid = false;
    } else {
      setNameError("");
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }
    if (valid) registerMutation.mutate();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex-1 flex items-center justify-center p-6 bg-background",
      "data-ocid": "register-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-7 w-7 text-primary" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Create Your Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "You're authenticated. Just complete your profile to get started." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-md", "data-ocid": "register-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Profile Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Tell us about yourself to personalize your experience" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: validateAndSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", className: "text-sm font-medium", children: [
                "Full Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  placeholder: "Rahul Sharma",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  onBlur: () => {
                    if (!name.trim()) setNameError("Name is required");
                    else setNameError("");
                  },
                  className: nameError ? "border-destructive focus-visible:ring-destructive" : "",
                  "data-ocid": "input-name"
                }
              ),
              nameError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: nameError })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", className: "text-sm font-medium", children: [
                "Email Address ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  placeholder: "rahul@example.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  onBlur: () => {
                    if (!email.trim()) setEmailError("Email is required");
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
                      setEmailError("Enter a valid email");
                    else setEmailError("");
                  },
                  className: emailError ? "border-destructive focus-visible:ring-destructive" : "",
                  "data-ocid": "input-email"
                }
              ),
              emailError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: emailError })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
                "Select Your Role ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2", children: roleOptions.map((opt) => {
                const isSelected = selectedRole === opt.value;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedRole(opt.value),
                    className: `flex items-start gap-3 p-3 rounded-lg border-2 text-left transition-smooth ${isSelected ? `${roleColors[opt.value]} border-opacity-100` : "border-border bg-card hover:bg-muted/30"}`,
                    "data-ocid": `role-option-${opt.value.toLowerCase()}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `mt-0.5 ${isSelected ? "" : "text-muted-foreground"}`,
                          children: opt.icon
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-sm font-semibold ${isSelected ? "" : "text-foreground"}`,
                            children: opt.label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-xs mt-0.5 ${isSelected ? "opacity-80" : "text-muted-foreground"}`,
                            children: opt.description
                          }
                        )
                      ] }),
                      isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }) })
                    ]
                  },
                  opt.value
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Note: Admin access is granted separately by the platform administrator." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full gap-2 font-semibold",
                size: "lg",
                disabled: registerMutation.isPending || !actor,
                "data-ocid": "btn-create-profile",
                children: registerMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" }),
                  "Creating Profile…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                  "Create My Profile"
                ] })
              }
            )
          ] }) })
        ] })
      ] })
    }
  );
}
export {
  RegisterPage as default
};
