/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, useEffect, useState } from "../client_deps.ts";
import CommentForm from "../components/CommentForm.tsx";
import CommentTable from "../components/CommentTable.tsx";
import { Paging } from "../components/Paging.tsx";
import { Pagenation } from "../logics/github.ts";
import { PagingProps } from "../types/comment.ts";

const PER_PAGE = 100;
export default function IssueComments(props: PagingProps) {
  const url = new URL(props.initUrl);
  const page = url.searchParams.get("page");
  const [issueComments, setIssueComments] = useState({ issueComments: [] });
  const [link, setLink] = useState<{ link: Pagenation }>({
    link: { hasNext: false, hasPrev: false },
  });

  useEffect(() => {
    const call = async () => {
      const res = await fetch(
        `/api/github/comments/issues/${
          encodeURIComponent(props.name)
        }?page=${page}&per_page=${PER_PAGE}`,
      );
      const json = await res.json();
      if (json.issueComments) {
        setIssueComments({ issueComments: json.issueComments });
      }

      if (json.link) {
        setLink({ link: json.link });
      }
    };
    call();
  }, [page]);
  const csvUrl = `/api/github/comments/issues/${
    encodeURIComponent(props.name)
  }/csv?page=${page}&per_page=${PER_PAGE}`;

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
      <CommentForm csvUrl={csvUrl}></CommentForm>
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
      <CommentTable comments={issueComments.issueComments} />
      <Paging onNext={onNextPage} onPrev={onPrevPage} link={link.link}></Paging>
    </>
  );
}
