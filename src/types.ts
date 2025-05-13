export interface LinearIssueWebhookPayload {
  action: "create";
  type: "Issue";
  createdAt: string; // ISO 8601 string: Timestamp of when the webhook event was sent
  data: IssueData; // The actual issue data
  url: string; // URL to the issue in the Linear app
  webhookTimestamp: number; // Unix timestamp (in milliseconds) of the webhook, used for signature verification
  organizationId?: string; // ID of the organization
  actor?: Actor; // The user or entity that performed the action
}

interface Actor {
  id: string; // UUID of the actor
  type: string; // e.g., "User", "ApiWebhook"
  name: string;
  email?: string; // Present if the actor is a user
}

interface IssueData {
  id: string; // UUID of the issue
  createdAt: string; // ISO 8601 string: Timestamp of when the issue was created
  updatedAt: string; // ISO 8601 string: Timestamp of when the issue was last updated
  archivedAt?: string | null; // ISO 8601 string: Timestamp if archived, otherwise null

  number: number; // Issue number within its team (e.g., 123 for TEAM-123)
  title: string;
  description?: string | null;
  priority: number; // 0: No priority, 1: Urgent, 2: High, 3: Medium, 4: Low
  priorityLabel: string; // e.g., "Urgent", "High", "Medium", "Low", "No Priority"
  estimate?: number | null; // Story points estimate
  boardOrder: number; // Order of the issue on a Kanban board
  sortOrder: number; // Global sort order for the issue

  startedAt?: string | null; // ISO 8601 string
  completedAt?: string | null; // ISO 8601 string
  canceledAt?: string | null; // ISO 8601 string
  autoClosedAt?: string | null; // ISO 8601 string
  autoArchivedAt?: string | null; // ISO 8601 string
  dueDate?: string | null; // ISO 8601 string (YYYY-MM-DD format)

  teamId: string; // UUID of the team the issue belongs to
  cycleId?: string | null; // UUID of the cycle, if any
  projectId?: string | null; // UUID of the project, if any
  creatorId: string; // UUID of the user who created the issue
  assigneeId?: string | null; // UUID of the user assigned to the issue
  stateId: string; // UUID of the workflow state (e.g., "Todo", "In Progress")
  parentId?: string | null; // UUID of the parent issue, if this is a sub-issue
  subIssueSortOrder?: number | null;

  labelIds: string[]; // Array of UUIDs for labels attached to the issue
  subscriberIds: string[]; // Array of UUIDs for users subscribed to notifications for this issue
  attachmentIds?: string[]; // Array of UUIDs for attachments (may not be present on creation if added later)

  url: string; // URL to the issue itself (often same as the top-level url)
  identifier: string; // Human-readable identifier (e.g., TEAM-123)
  branchName: string; // Suggested Git branch name for the issue
}
