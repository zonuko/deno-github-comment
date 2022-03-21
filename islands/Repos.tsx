/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, useEffect, useState } from "../client_deps.ts";

import { Paging } from "../components/Paging.tsx";
import { Pagenation } from "../logics/github.ts";

const PER_PAGE = 30;

export default function Repo(props: { initUrl: URL; page: number }) {
  const [repos, setRepos] = useState({
    repos: [],
  });

  const [url, setUrl] = useState(props.initUrl);
  const [page, setPage] = useState(props.page);
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
    <>
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
      <div class="mb-3 list-group list-group-flush">
        {repos.repos.map((val, idx) => (
          <a
            href={`/mypage/github/repo/${
              encodeURIComponent(val["full_name"])
            }/issues`}
            class="list-group-item list-group-item-action"
            key={idx}
          >
            {val["full_name"]}
          </a>
        ))}
      </div>
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
    </>
  );
}
