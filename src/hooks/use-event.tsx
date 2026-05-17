import { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import {
  GetEventDocument,
  GetEventQueryResult,
} from "@/graphql/graphql-types";
import EmptyState from "@/components/ui/EmptyState";
import { formatError } from "@/utils/format-error";

type UseEventOptions = {
  eventIdParam: string | undefined;
  loadingFallback: ReactElement;
};

type UseEventResult = {
  id: number;
  event: NonNullable<GetEventQueryResult["event"]> | null;
  refetch: () => void;
  fallback: ReactElement | null;
};

export function useEvent({
  eventIdParam,
  loadingFallback,
}: UseEventOptions): UseEventResult {
  const id = eventIdParam ? parseInt(eventIdParam) : NaN;
  const validId = !Number.isNaN(id);

  const { data, loading, error, refetch } = useQuery(GetEventDocument, {
    variables: { eventId: id },
    skip: !validId,
  });

  const wrap = (node: ReactNode): ReactElement => (
    <div className="mx-auto max-w-5xl px-4 w-full py-6">{node}</div>
  );

  if (!validId) {
    return {
      id,
      event: null,
      refetch,
      fallback: wrap(
        <EmptyState
          title="Event not found"
          description="That event link doesn't look right."
        >
          <Link to="/home" className="btn btn-primary rounded-2xl">
            Back home
          </Link>
        </EmptyState>,
      ),
    };
  }

  if (loading) {
    return { id, event: null, refetch, fallback: loadingFallback };
  }

  if (error) {
    return {
      id,
      event: null,
      refetch,
      fallback: wrap(
        <EmptyState
          variant="error"
          title="Couldn't load this event"
          description={formatError(error)}
        >
          <button
            onClick={() => refetch()}
            className="btn btn-primary rounded-2xl"
          >
            Try again
          </button>
          <Link to="/home" className="btn btn-ghost rounded-2xl">
            Back home
          </Link>
        </EmptyState>,
      ),
    };
  }

  if (!data?.event) {
    return {
      id,
      event: null,
      refetch,
      fallback: wrap(
        <EmptyState
          title="Event not found"
          description="It may have been removed."
        >
          <Link to="/home" className="btn btn-primary rounded-2xl">
            Back home
          </Link>
        </EmptyState>,
      ),
    };
  }

  return { id, event: data.event, refetch, fallback: null };
}
