/** @jsx h */
import { Layout } from "../../components/Layout.tsx";
import { Paging } from "../../components/Paging.tsx";
import {
  h,
  PageConfig,
  PageProps,
  useData,
  useEffect,
  useState,
} from "../../deps.ts";
import { Pagenation } from "../../logics/github.ts";

const PER_PAGE = 30;

export default function Github(props: PageProps) {
  // todo: 本来であればuseDataにしたいが、サーバー側でのAPI実行時にcookie含むヘッダーをそのままに転送する方法がわからない
  // const repos = useData("githubRepos", async () => {
  //   const res = await fetch("http://localhost:8000/api/github/repos");
  //   return await res.json();
  // });
  const [repos, setRepos] = useState({
    repos: [],
  });
  const initUrl = useData("repoInitUrl", () => props.url);
  const pageParams = useData(
    "repoInitPageNo",
    () => {
      const p = parseInt(props.url.searchParams.get("page") || "1");
      if (p <= 0) return 1;
      return p;
    },
  );

  const [url, setUrl] = useState(initUrl);
  const [page, setPage] = useState(pageParams);
  const [link, setLink] = useState<{ link: Pagenation }>({
    link: { hasNext: false, hasPrev: false },
  });
  useEffect(() => {
    const call = async () => {
      const res = await fetch(
        `/api/github/repos?page=${page}&per_page=${PER_PAGE}`,
      );
      const json = await res.json();
      if (json.repos) {
        setRepos({ repos: json.repos });
      }
      if (json.link) {
        setLink({ link: json.link });
      }
    };
    call();
    // TODO: ここらへん外側に持ってくかカスタムhookに
    const newUrl = new URL(url);
    newUrl.searchParams.set("page", page.toString());
    window.history.pushState(null, "", newUrl);
    setUrl(newUrl);
  }, [page]);

  const onPrevPage = () => {
    // TODO: 型ガードの類使ってprevパラメータのチェックはなくしたい(nextも同様)
    if (link.link.hasPrev && link.link.prev) {
      setPage(link.link.prev);
    }
  };
  const onNextPage = () => {
    if (link.link.hasNext && link.link.next) {
      setPage(link.link.next);
    }
  };

  return (
    <Layout title="Repos - GitHub Comments">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Your Github Repos</span>
        </div>
      </nav>
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
      <div class="mb-3 list-group list-group-flush">
        {repos.repos.map((val, idx) => (
          <a
            href={`/mypage/github/repo/${encodeURIComponent(val["full_name"])}`}
            class="list-group-item list-group-item-action"
            key={idx}
          >
            {val["full_name"]}
          </a>
        ))}
      </div>
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
    </Layout>
  );
}

export const config: PageConfig = { runtimeJS: true };
