/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Head, PageProps } from "../client_deps.ts";

export default function Home(props: PageProps) {
  let errorQuery = "";
  const q = props.url.searchParams.get("error");
  if (q === "missing_code") {
    errorQuery = "Not found GitHub OAuth code";
  }
  if (q === "invalid_state") {
    errorQuery = "Invalid OAuth state";
  }
  if (q === "failed_to_get_token") {
    errorQuery = "Failed to get the access token";
  }

  return (
    <>
      <Head>
        <title>Login - GitHub Comments</title>
      </Head>
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
      {/* </Layout> */}
    </>
  );
}
