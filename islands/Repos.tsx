/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, useEffect, useState } from "../client_deps.ts";

import { Paging } from "../components/Paging.tsx";
import { Pagenation } from "../logics/github.ts";

const PER_PAGE = 30;

export default function Repo(props: { initUrl: URL; page: number }) {
  const url = new URL(props.initUrl);
  const page = url.searchParams.get("page");

  const [repos, setRepos] = useState({
    repos: [],
  });

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
  }, [page]);
  const onPrevPage = () => {
    if (link.link.hasPrev && link.link.prev) {
      url.searchParams.set("page", link.link.prev.toString());
      document.location.href = url.toString();
    }
  };
  const onNextPage = () => {
    if (link.link.hasNext && link.link.next) {
      url.searchParams.set("page", link.link.next.toString());
      document.location.href = url.toString();
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
