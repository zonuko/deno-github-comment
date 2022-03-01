/** @jsx h */
import { Layout } from "../components/Layout.tsx";
import { h, PageConfig, PageProps, useData } from "../deps.ts";

export default function Home(props: PageProps) {
  const errorQuery = useData("errorQuery", () => {
    const q = props.url.searchParams.get("error");
    if (q === "missing_code") {
      return "Not found GitHub OAuth code";
    }
    if (q === "invalid_state") {
      return "Invalid OAuth state";
    }
    if (q === "failed_to_get_token") {
      return "Failed to get the access token";
    }
  });

  return (
    <Layout title="Login - GitHub Comments">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Login</span>
        </div>
      </nav>

      {errorQuery &&
        (
          <div class="alert alert-danger" role="alert">
            {errorQuery}
          </div>
        )}
      <div class="position-relative text-center">
        <a
          type="button"
          class="btn btn-outline-dark"
          href="/login/github/auth"
        >
          <i class="bi bi-github"></i>
          {" Login with GitHub"}
        </a>
      </div>
    </Layout>
  );
}

export const config: PageConfig = { runtimeJS: true };
