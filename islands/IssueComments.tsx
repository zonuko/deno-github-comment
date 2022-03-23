/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, useEffect, useState } from "../client_deps.ts";
import CommentTable from "../components/CommentTable.tsx";
import { Paging } from "../components/Paging.tsx";
import { Pagenation } from "../logics/github.ts";
interface Props {
  name: string;
  initUrl: URL;
  page: number;
}

export default function IssueComments(props: Props) {
  const [issueComments, setIssueComments] = useState({ issueComments: [] });
  const [url, setUrl] = useState(props.initUrl);
  const [page, setPage] = useState(props.page);
  const [link, setLink] = useState<{ link: Pagenation }>({
    link: { hasNext: false, hasPrev: false },
  });

  useEffect(() => {
    const call = async () => {
      const res = await fetch(
        `/api/github/comments/issues/${encodeURIComponent(props.name)}`,
      );
      const json = await res.json();
      setIssueComments(json);
      if (json.issueComments) {
        setIssueComments({ issueComments: json.issueComments });
      }

      if (json.link) {
        setLink({ link: json.link });
      }
    };
    const newUrl = new URL(url);
    newUrl.searchParams.set("page", page.toString());
    window.history.pushState(null, "", newUrl);
    setUrl(newUrl);

    call();
  }, [props.name]);
  const onPrevPage = () => {
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
      <CommentTable comments={issueComments.issueComments} />
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
    </>
  );
}
