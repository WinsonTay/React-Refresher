import { Fragment, useEffect } from "react";
import {
  Route,
  useParams,
  Link,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
// const DUMMY_DATA = [
//   {
//     id: "q1",
//     author: "Max",
//     text: "Learning React is Fun",
//   },
//   {
//     id: "q2",
//     author: "Maximilian",
//     text: "Learning React is great!",
//   },
// ];
const QuoteDetail = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);
  const location = useLocation();
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  const isShowingComments = location.pathname.search("comments") !== -1;

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedQuote && status === "completed") {
    return <p>No Quote found</p>;
  }
  if (loadedQuote && status === "completed") {
    return (
      <Fragment>
        <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
        <div className="centered">
          {!isShowingComments && (
            <Link className="btn--flat" to={`${match.url}/comments`}>
              Show Comments
            </Link>
          )}
          {isShowingComments && (
            <Link className="btn--flat" to={match.url}>
              {" "}
              Hide Comments
            </Link>
          )}
        </div>
        <Route path={`${match.path}/comments`}>
          <Comments />
        </Route>
      </Fragment>
    );
  }
};
export default QuoteDetail;
