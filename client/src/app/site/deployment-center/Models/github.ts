export class FileContent {
  path: string;
  type: string;
  contents: string;
  encoding: string;
  sha: string;
}

export class WorkflowInformation {
  fileName: string;
  secretName: string;
  content: string;
}

export interface GitHubCommitter {
  name: string;
  email: string;
}

export interface GitHubCommit {
  repoName: string;
  branchName: string;
  filePath: string;
  message: string;
  committer: GitHubCommitter;
  contentBase64Encoded: string;
  sha?: string;
}

export interface GitHubActionWorkflowRequestContent {
  resourceId: string;
  secretName: string;
  commit: GitHubCommit;
}
