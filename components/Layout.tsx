/** @jsx h */
import { ComponentChildren, h, Head } from "../client_deps.ts";
export function Layout(
  { title, children }: { title: string; children: ComponentChildren },
) {
  return (
    <div class="container">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        >
        </link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
        >
        </link>
        <title>{title}</title>
      </Head>
      <div class="mt-5">
        {children}
      </div>
    </div>
  );
}
