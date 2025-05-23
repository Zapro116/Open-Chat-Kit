import React from "react";
import { Badge, Progress, Tooltip } from "@mantine/core";
import {
  IconBook,
  IconInfoCircle,
  IconExternalLink,
  IconCalendar,
} from "@tabler/icons-react";

/**
 * KnowledgeBaseDetailCard component for displaying knowledge base details
 * @param {Object} knowledgeBase - The knowledge base data to display
 */
export const KnowledgeBaseDetailCard = ({ knowledgeBase }) => {
  // Check if knowledgeBase exists
  if (!knowledgeBase) {
    return <div>No knowledge base data available</div>;
  }

  const {
    kb_id,
    name,
    state,
    created_at,
    last_indexed_at,
    success_percentage,
    integration,
  } = knowledgeBase;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color based on state
  const getStatusBadgeColor = (state) => {
    switch (state?.toLowerCase()) {
      case "ready":
        return "green";
      case "indexing":
      case "processing":
        return "blue";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="knowledge-base-detail-card">
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <p className="text-xs text-textDimmedColor mb-1">ID</p>
          <p className="text-sm text-textDefault">{kb_id}</p>
        </div>

        <div className="mb-4">
          <p className="text-xs text-textDimmedColor mb-1">Status</p>
          <Badge color={getStatusBadgeColor(state)} size="sm">
            {state || "Unknown"}
          </Badge>
        </div>

        <div className="mb-4">
          <p className="text-xs text-textDimmedColor mb-1">Created</p>
          <div className="flex items-center">
            <IconCalendar size={14} className="mr-1 text-textDimmedColor" />
            <p className="text-sm text-textDefault">{formatDate(created_at)}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-textDimmedColor mb-1">Last Indexed</p>
          <div className="flex items-center">
            <IconCalendar size={14} className="mr-1 text-textDimmedColor" />
            <p className="text-sm text-textDefault">
              {formatDate(last_indexed_at)}
            </p>
          </div>
        </div>

        {integration && (
          <div className="mb-4 col-span-2">
            <p className="text-xs text-textDimmedColor mb-1">Integration</p>
            <div className="flex items-center">
              <p className="text-sm text-textDefault">
                {integration.name || integration.type || "Unknown"}
              </p>
              {integration.integration_help_url && (
                <a
                  href={integration.integration_help_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-textPurple"
                >
                  <IconExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}

        {success_percentage !== undefined && (
          <div className="mb-4 col-span-2">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-textDimmedColor">Indexing Progress</p>
              <p className="text-xs text-textDefault">{success_percentage}%</p>
            </div>
            <Progress
              value={success_percentage}
              color="green"
              size="sm"
              radius="xs"
            />
          </div>
        )}
      </div>
    </div>
  );
};
