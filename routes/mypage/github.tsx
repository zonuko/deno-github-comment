/** @jsx h */
import { Layout } from "../../components/Layout.tsx";
import { h, PageProps, useEffect, useState } from "../../client_deps.ts";
import Repos from "../../islands/Repos.tsx";

const PER_PAGE = 30;

export default function Github(props: PageProps) {
  const initUrl = props.url;
  let p = parseInt(props.url.searchParams.get("page") || "1");
  if (p <= 0) {
    p = 1;
  }

  return (
    <Layout title="Repos - GitHub Comments">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Your Github Repos</span>
        </div>
      </nav>
      <Repos initUrl={initUrl} page={p}></Repos>
    </Layout>
  );
}
